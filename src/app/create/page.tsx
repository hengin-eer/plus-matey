'use client';

import SectionHeading from '@/components/sections/create/SectionHeading';
import SectionLeftForms from '@/components/sections/create/SectionLeftForms';
import SectionRightForms from '@/components/sections/create/SectionRightForms';
import { FormEvent, useState } from 'react';

function Create() {
	type FormContents = {
		title: string | null;
		summary: string | null;
		thumbnail: File | string | null;
		close_at: string | null;
		number_recruited: number | null;
		held_at: string | null;
		department: string[] | null;
		sex: string | null;
		grade: string[] | null;
	};

	const [formContents, setFormContents] = useState<FormContents>();
	// TODO: isPublicはFirestoreから取得するようにする
	const [isPublic, setIsPublic] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const output: FormContents = {
			title: formData.get('title') as string,
			summary: formData.get('summary') as string,
			thumbnail: formData.get('thumbnail'),
			close_at: formData.get('close_at') as string,
			number_recruited: formData.get('number_recruited') as unknown as number,
			held_at: String(formData.get('held_at')) as string,
			department: formData.get('department') as unknown as string[],
			sex: formData.get('sex') as string,
			grade: formData.get('grade') as unknown as string[],
		};

		// NOTE: 編集内容が変更されたかどうかチェック
		if (JSON.stringify(output) !== JSON.stringify(formContents)) {
			setFormContents(output);
		} else {
			console.log('😄😄😄: ', '状態は変わっていないよ！');
		}
		setIsPublic(formData.get('title') !== null);
	};

	console.log(formContents); // DEBUG:

	return (
		<main className="px-5 lg:px-10">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="pt-5 pb-20 flex flex-col gap-10"
			>
				{/* 
				NOTE: Server Actionを使って実装
				TODO: 暫定的に固定幅にしている。後でレスポンシブの設定をする
				 */}

				<SectionHeading isPublic={isPublic} setIsPublic={setIsPublic} />

				{/* TODO: レスポンシブ対応しましょう！！ */}
				<div className="mx-auto w-full flex flex-col justify-center gap-6 lg:flex-row">
					<SectionLeftForms />
					<SectionRightForms />
				</div>
			</form>
		</main>
	);
}

export default Create;
