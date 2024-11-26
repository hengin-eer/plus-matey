'use server';

import { auth } from '@/auth';
import { db, storage } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const eventDataSchema = z.object({
	title: z.string().min(1, '募集タイトルを入力してください'),
	summary: z.string().min(1, '概要を入力してください'),
	close_at: z.string().min(1, '募集期限を入力してください'),
	number_recruited: z
		.number()
		.min(
			1,
			'募集人数を入力してください。または人数を1人以上に設定してください。'
		),
	held_at: z.string().min(1, '開催日時を入力してください'),
	department: z.array(z.string()).min(1, '学科を選択してください'),
	sex: z.string().min(1, '性別を選択してください'),
	grade: z.array(z.string()).min(1, '学年を選択してください'),
});

export type RecruitmentFormData = z.infer<typeof eventDataSchema>;

type ActionResponse = {
	success: boolean;
	message?: string;
};

// NOTE: 結局Storageが使えなくて、アップロードはしてないよ
export const uploadThumbnail = async (file: File) => {
	if (file && file.size > 0) {
		const fileName = `thumbnails/${Date.now()}-${file.name}`;

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const fileRef = storage.bucket().file(fileName);
		await fileRef.save(buffer, {
			metadata: {
				contentType: file.type,
			},
		});

		await fileRef.makePublic();

		return fileRef.publicUrl();
	}
};

export const encodeThumbnail = async (file: File) => {
	if (file && file.size > 0) {
		const arrayBuffer = await file.arrayBuffer();
		const base64 = Buffer.from(arrayBuffer).toString('base64');
		const mimeType = file.type;

		return `data:${mimeType};base64,${base64}`;
	}
};

export async function createEventAction(formData: FormData) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return {
				success: false,
				message: 'ログインが必要です',
			};
		}

		const rawData = {
			title: formData.get('title'),
			summary: formData.get('summary'),
			close_at: formData.get('close_at'),
			number_recruited: Number(formData.get('number_recruited')),
			held_at: formData.get('held_at'),
			department: formData.getAll('department'),
			sex: formData.get('sex'),
			grade: formData.getAll('grade'),
		};

		const validatedData = eventDataSchema.parse(rawData);

		const thumbnailData = formData.get('thumbnail') as File;
		// const thumbnailURL = thumbnailData
		// 	? await uploadThumbnail(thumbnailData)
		// 	: null;

		const thumbnailBase64 = thumbnailData
			? await encodeThumbnail(thumbnailData)
			: null;

		const finalData = {
			...validatedData,
			thumbnail: {
				base64: thumbnailBase64,
				name: thumbnailData ? thumbnailData.name : null,
			},
			author_id: session.user.id,
			created_at: new Date(),
			updated_at: new Date(),
			is_public: true,
		};

		await db.collection('events').add(finalData);

		return {
			success: true,
			message: '募集を作成しました！',
		};
	} catch (error) {
		console.error('Recruitment creation error:', error);
		if (error instanceof z.ZodError) {
			return {
				success: false,
				message: error.errors[0].message,
			};
		}
		return {
			success: false,
			message: `
				募集の作成に失敗しました。
				申しわけありませんが、もう一度公開ボタンを押すか時間を空けてから再度お試しください。
			`,
		};
	}
}

export async function updateRecruitment(
	id: string,
	prevState: ActionResponse,
	formData: FormData
): Promise<ActionResponse> {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return {
				success: false,
				message: 'ログインが必要です',
			};
		}

		// 募集データの存在確認と権限チェック
		const recruitmentRef = db.collection('recruitments').doc(id);
		const recruitment = await recruitmentRef.get();

		if (!recruitment.exists) {
			return {
				success: false,
				message: '募集が見つかりません',
			};
		}

		if (recruitment.data()?.author_id !== session.user.id) {
			return {
				success: false,
				message: '編集権限がありません',
			};
		}

		const rawData = {
			title: formData.get('title'),
			summary: formData.get('summary'),
			thumbnail: formData.get('thumbnail'),
			close_at: formData.get('close_at'),
			number_recruited: Number(formData.get('number_recruited')),
			held_at: formData.get('held_at'),
			department: formData.getAll('department'),
			sex: formData.get('sex'),
			grade: formData.getAll('grade'),
		};

		const validatedData = eventDataSchema.parse(rawData);

		await recruitmentRef.update({
			...validatedData,
			updated_at: new Date(),
			is_public: formData.get('is_public') === 'true',
		});

		revalidatePath('/recruitments');
		revalidatePath(`/recruitments/${id}`);

		return {
			success: true,
			message: '募集を更新しました',
		};
	} catch (error) {
		console.error('Recruitment update error:', error);
		if (error instanceof z.ZodError) {
			return {
				success: false,
				message: error.errors[0].message,
			};
		}
		return {
			success: false,
			message: '募集の更新に失敗しました',
		};
	}
}
