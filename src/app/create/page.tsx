'use client';

import SectionHeading from '@/components/sections/create/SectionHeading';
import SectionLeftForms from '@/components/sections/create/SectionLeftForms';
import SectionRightForms from '@/components/sections/create/SectionRightForms';
import { FormEvent } from 'react';
import { createEventAction } from '../actions/manageEventAction';
import { useRouter } from 'next/navigation';

function Create() {
	const router = useRouter();

	const handleAction = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const output = {
			title: formData.get('title'),
			summary: formData.get('summary'),
			thumbnail: formData.get('thumbnail'),
			close_at: formData.get('close_at'),
			number_recruited: formData.get('number_recruited'),
			held_at: String(formData.get('held_at')),
			department: formData.get('department'),
			sex: formData.get('sex'),
			grade: formData.get('grade'),
			// オーナー情報（問い合わせフォームとかも）も追加しよう
		};

		console.log(output); // DEBUG:

		const res = await createEventAction(formData);

		console.log(res);

		if (res?.success) {
			router.push(`/manage/done?message=${res.message}`);
		} else {
			alert(res.message);
		}
	};

	return (
		<main className="px-5 lg:px-10">
			<form onSubmit={handleAction} className="pt-5 pb-20 flex flex-col gap-10">
				<SectionHeading isPublic={false} />

				<div className="mx-auto w-full flex flex-col justify-center gap-6 lg:flex-row">
					<SectionLeftForms />
					<SectionRightForms />
				</div>
			</form>
		</main>
	);
}

export default Create;
