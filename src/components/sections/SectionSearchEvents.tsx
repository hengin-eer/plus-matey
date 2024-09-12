// TODO: 後で検索機能の部分的なクライアントコンポ化を検討する
'use client';

import { FC } from 'react';
import PageHeading from '../parts/PageHeading';
import { Icon } from '@iconify/react';

const SectionSearchEvents: FC = () => {
	const searchOptions = [
		{
			id: 'bosyu-tyu',
			jp: 'まだ募集中',
		},
		{
			id: 'following-categories',
			jp: 'フォローしているカテゴリ',
		},
		{
			id: 'coming-limit',
			jp: '募集締め切りが間近',
		},
		{
			id: 'matching-skill',
			jp: '自分のスキルと合致',
		},
		{
			id: 'any-othor',
			jp: '...',
		},
	];

	// TODO: 検索ワードと検索条件をクエリパラメータを使ってイベントを検索する処理
	const handleSearchEvents = () => {
		alert('検索します～');
	};

	return (
		// w-[360px] は一時的な措置。子要素のインプットフォームの大きさ基準でレスポンシブ対応
		<section className="w-[360px]">
			<PageHeading>イベントを探す</PageHeading>

			<div className="px-10 py-8 rounded-lg flex flex-col gap-12 bg-white border border-gray">
				<div className="w-[280px] flex flex-col gap-3">
					<input
						type="text"
						placeholder="検索ワードを入力してください"
						className="px-5 py-3 rounded-lg bg-light-gray placeholder:text-base placeholder:
					text-gray focus-visible:text-foreground focus-visible:outline-gray transition-all duration-300"
					/>
					<button
						type="submit"
						onClick={() => handleSearchEvents()}
						className="flex items-center justify-center gap-2 h-12 rounded-lg bg-primary-green"
					>
						<Icon
							icon="material-symbols-light:search-rounded"
							className="size-8"
						/>
						<p className="text-base">この条件で検索する</p>
					</button>
				</div>

				<div className="flex flex-col gap-6">
					{searchOptions.map((item) => (
						<label
							key={item.id}
							className="relative flex items-center gap-4 select-none"
						>
							<input
								type="checkbox"
								name="search-options"
								value={item.id}
								className="hidden peer/checkbox"
							/>
							<span className="relative size-4 border border-black rounded-[4px] peer-checked/checkbox:bg-primary-yellow transition-all" />
							<Icon
								icon="material-symbols-light:check-small-rounded"
								className="absolute -left-[4px] opacity-0 size-6 peer-checked/checkbox:opacity-100 transition-all"
							/>
							<p>{item.jp}</p>
						</label>
					))}
				</div>

				<p className="text-sm leading-6">
					「締め切りが間近」なイベントは1週間以内に募集が締め切られます。
				</p>
			</div>
		</section>
	);
};

export default SectionSearchEvents;
