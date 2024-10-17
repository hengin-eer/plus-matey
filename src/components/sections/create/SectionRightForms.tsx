'use client';

import RichDatePicker from '@/components/parts/create/RichDatePicker';
import EventInputForm from '@/components/parts/create/EventInputFrom';
import PageHeading from '@/components/parts/PageHeading';
import { useState, type FC } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';

const SectionRightForms: FC = () => {
	const departmentList = [
		{
			id: 'm',
			text: '機械工学科',
		},
		{
			id: 'e',
			text: '電気情報工学科',
		},
		{
			id: 'c',
			text: '都市システム工学科',
		},
		{
			id: 'a',
			text: '建築学科',
		},
	];

	const sexList = [
		{
			id: 'both',
			text: '性別問わず',
		},
		{
			id: 'male',
			text: '男性',
		},
		{
			id: 'female',
			text: '女性',
		},
	];

	const gradeList = [
		{
			id: 'grade-1',
			text: '1年生',
		},
		{
			id: 'grade-2',
			text: '2年生',
		},
		{
			id: 'grade-3',
			text: '3年生',
		},
		{
			id: 'grade-4',
			text: '4年生',
		},
		{
			id: 'grade-5',
			text: '5年生',
		},
		{
			id: 'grade-6',
			text: '専攻科生',
		},
		{
			id: 'grade-7',
			text: '教員',
		},
	];

	const [closeAt, setCloseAt] = useState<DateValueType>({
		startDate: null,
		endDate: null,
	});

	const [heldAt, setHeldAt] = useState<DateValueType>({
		startDate: null,
		endDate: null,
	});

	return (
		<section className="w-full flex flex-col gap-6 lg:w-[320px]">
			<EventInputForm
				title="募集締め切り"
				summary="イベントの募集締め切り期限をここで設定します。"
				isRequired
			>
				<RichDatePicker name="close_at" value={closeAt} setValue={setCloseAt} />
			</EventInputForm>

			<EventInputForm title="募集人数" isRequired>
				<label>
					<input
						type="number"
						max={1024}
						name="number_recruited"
						placeholder="募集人数を入力してください"
						className="px-4 py-2 w-full rounded-sm bg-light-gray text-foreground outline-none placeholder:text-base placeholder:text-gray focus-visible:outline-gray transition-all duration-300"
						required
					/>
				</label>
			</EventInputForm>

			<EventInputForm
				title="開催日時"
				summary="イベント開催日時を入力してください。"
				isRequired
			>
				<RichDatePicker name="held_at" value={heldAt} setValue={setHeldAt} />
			</EventInputForm>

			<section>
				<PageHeading>オプション</PageHeading>
				<div className="flex flex-col gap-6">
					<EventInputForm
						title="学科"
						summary="
							学科を絞って募集したい場合は選択してください。<br/>
							デフォルトは全学科。
						"
					>
						<div className="flex flex-col gap-4">
							{departmentList.map((item) => (
								<label
									key={item.id}
									className="flex items-center gap-4 select-none"
								>
									<input
										type="checkbox"
										name="department"
										value={item.id}
										className=""
									/>
									{/* TODO: チップ風のUIコンポと差し替える */}
									<p>{item.text}</p>
								</label>
							))}
						</div>
					</EventInputForm>

					<EventInputForm
						title="性別"
						summary="
							性別を絞って募集したい場合は選択してください。<br/>
							デフォルトは性別問わず。
						"
						isRequired
					>
						<div className="flex flex-col gap-4">
							{sexList.map((item) => (
								<label
									key={item.id}
									className="flex items-center gap-4 select-none"
								>
									<input
										type="radio"
										name="sex"
										value={item.id}
										defaultChecked={item.id === 'both'}
										required
									/>
									<p>{item.text}</p>
								</label>
							))}
						</div>
					</EventInputForm>

					<EventInputForm
						title="学年"
						summary="
							学年を絞って募集したい場合は選択してください。<br/>
							デフォルトは全学年。
						"
					>
						<div className="flex flex-col gap-4">
							{gradeList.map((item) => (
								<label
									key={item.id}
									className="flex items-center gap-4 select-none"
								>
									<input
										type="checkbox"
										name="grade"
										value={item.id}
										className=""
									/>
									{/* TODO: チップ風のUIコンポと差し替える */}
									<p>{item.text}</p>
								</label>
							))}
						</div>
					</EventInputForm>
				</div>
			</section>
		</section>
	);
};

export default SectionRightForms;
