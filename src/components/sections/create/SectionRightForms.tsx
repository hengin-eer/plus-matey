import EventInputForm from '@/components/parts/EventInputFrom';
import type { FC } from 'react';

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

	return (
		<section className="w-[400px] flex flex-col gap-6">
			<EventInputForm
				title="開催日時"
				summary="イベント開催日時を入力してください。"
				isRequired
			>
				<label>
					{/* 
							TODO: ライブラリを使用してリッチなUIにする
							TODO: 今日以前の日時を選択できないようにする
							*/}
					<input type="date" name="held_at" className="" required />
				</label>
			</EventInputForm>

			<EventInputForm
				title="学科の制限"
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
								name="deaprtment"
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
				title="性別の制限"
				summary="
					性別を絞って募集したい場合は選択してください。<br/>
					デフォルトは性別問わず。
				"
			>
				<div className="flex flex-col gap-4">
					{sexList.map((item) => (
						<label
							key={item.id}
							className="flex items-center gap-4 select-none"
						>
							<input type="radio" name="sex" value={item.id} className="" />
							<p>{item.text}</p>
						</label>
					))}
				</div>
			</EventInputForm>

			<EventInputForm
				title="学年の制限"
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
								name="deaprtment"
								value={item.id}
								className=""
							/>
							{/* TODO: チップ風のUIコンポと差し替える */}
							<p>{item.text}</p>
						</label>
					))}
				</div>
			</EventInputForm>
		</section>
	);
};

export default SectionRightForms;
