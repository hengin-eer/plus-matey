import EventInputForm from '@/components/parts/create/EventInputFrom';
import Select from '@/components/parts/create/Select';
import type { FC } from 'react';

const SectionOwner: FC = () => {
	const teamList = [
		{
			id: '',
			name: '運営チームを選択する',
		},
		{
			id: 'team-all-in-one',
			name: 'チームAll in One!',
		},
		{
			id: 'team-bad-man',
			name: 'ちーむ ばっどまん',
		},
	];

	// NOTE: チーム選択によってメンバーが変化する
	const currentMemberList = [
		{
			id: '123@gmail.com',
			name: 'E0001 山田太郎',
		},
		{
			id: '223@gmail.com',
			name: 'E0002 田中次郎',
		},
		{
			id: '323@gmail.com',
			name: 'E0003 魚住花子',
		},
		{
			id: '423@gmail.com',
			name: 'E0004 明石太郎',
		},
	];

	return (
		<section>
			<EventInputForm
				title="運営チームの情報編集"
				summary="運営チームの選択を行います。また、問い合わせのために管理者や問い合わせ先フォームのリンクを指定できます。"
				isRequired
			>
				<div className="flex flex-col gap-6">
					<Select
						heading="運営チーム"
						selectName="teamId"
						ariaLabel="運営チームの選択"
						dataList={teamList}
					/>

					{/* NOTE: チームが無ければ作成するように促す */}

					<Select
						heading="管理者"
						selectName="owner"
						ariaLabel="管理者の選択"
						dataList={currentMemberList}
						required
					/>

					<div className="flex flex-col gap-2 py-2">
						<p className="text-lg">お問い合わせフォームの設置</p>
						<p className="text-sm leading-[1.8]">
							イベント開催前後の問い合わせに対応するためにフォームのリンクを指定できます。Google
							Formsがおススメです。
						</p>
						<label>
							<input
								type="url"
								name="contactFormURL"
								placeholder="フォームのURLを入力してください"
								className="w-full px-4 py-2 rounded-sm bg-light-gray text-foreground outline-none placeholder:text-base placeholder:text-gray focus-visible:outline-gray transition-all duration-300"
							/>
						</label>
					</div>
				</div>
			</EventInputForm>
		</section>
	);
};

export default SectionOwner;
