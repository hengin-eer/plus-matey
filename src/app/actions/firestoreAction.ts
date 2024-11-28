'use server';

import { adminFirestore, db } from '@/lib/firebase';
import { EventData } from '@/types/events';

function serializeTimestamp(timestamp: any): Date {
	return timestamp ? new Date(timestamp._seconds * 1000) : new Date();
}

function formatDate(dateString: string) {
	const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
	const date = new Date(dateString);
	const month = date.getMonth() + 1; // 月は0から始まる
	const day = date.getDate();
	const dayOfWeek = daysOfWeek[date.getDay()];
	return `${month}.${day} (${dayOfWeek})`;
}

export async function getFirestoreAction(page = 1, limit = 10) {
	const offset = (page - 1) * limit;

	const snapshot = await db
		.collection('events')
		.where('is_public', '==', true)
		.orderBy('created_at', 'desc')
		.limit(limit)
		.offset(offset)
		.get();

	const eventList = snapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			...data,
			close_at: formatDate(data.close_at),
			held_at: formatDate(data.held_at),
			created_at: serializeTimestamp(data.created_at),
			updated_at: serializeTimestamp(data.updated_at),
			// TODO: オーナー情報のアイコンとかも返せるようにしよう
		} as EventData;
	});

	const totalEvent = await db.collection('events').count().get();

	return {
		eventList: eventList,
		total: totalEvent.data().count,
	};
}

type ApplyEventActionResponse = {
	success: boolean;
	message?: string;
};

export async function applyEventFirestoreAction(
	userId: string,
	eventId: string
): Promise<ApplyEventActionResponse> {
	try {
		const snapshot = await db.collection('events').doc(eventId).get();
		const data = snapshot.data() as EventData;

		const appliedUserCount = data.appliedUserIds.length;

		const isNumber_recruitedFull = appliedUserCount === data.number_recruited;
		if (isNumber_recruitedFull) {
			return {
				success: false,
				message: 'イベントの募集人数が満員です！申し訳ありません...',
			};
		} else {
			await db
				.collection('events')
				.doc(eventId)
				.update({
					appliedUserIds: adminFirestore.FieldValue.arrayUnion(userId),
				});

			await db
				.collection('users')
				.doc(userId)
				.update({
					appliedEventList: adminFirestore.FieldValue.arrayUnion(eventId),
				});

			return {
				success: true,
				message: '申し込みが完了しました！',
			};
		}
	} catch (error) {
		console.error('何らかの原因でイベント申し込みに失敗しました！！', error);
		return {
			success: false,
			message: `エラー情報： ${error}`,
		};
	}
}

export async function cancelEventFirestore(
	userId: string,
	eventId: string
): Promise<ApplyEventActionResponse> {
	try {
		await db
			.collection('events')
			.doc(eventId)
			.update({
				appliedUserIds: adminFirestore.FieldValue.arrayRemove(userId),
			});

		await db
			.collection('users')
			.doc(userId)
			.update({
				appliedEventList: adminFirestore.FieldValue.arrayRemove(eventId),
			});

		return {
			success: true,
			message: 'キャンセルが完了しました！',
		};
	} catch (error) {
		console.error(
			'何らかの原因でイベントのキャンセルに失敗しました！！',
			error
		);
		return {
			success: false,
			message: `エラー情報： ${error}`,
		};
	}
}
