import { FC } from 'react';
import PageHeading from '../parts/PageHeading';

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
					<button className="h-12 rounded-lg bg-primary-green">
						{/* TODO: 虫メガネアイコンを追加 */}
						<p className="text-base">この条件で検索する</p>
					</button>
				</div>

				<div className="flex flex-col gap-8">
					{/* TODO: ラジオボタンのスタイル追加 */}
					{searchOptions.map((item) => (
						<span key={item.id} className="flex items-center gap-6">
							<input type="radio" value={item.id} />
							<p>{item.jp}</p>
						</span>
					))}
				</div>

				{/* TODO: 注意書き等々を追加... */}
			</div>
		</section>
	);
};

export default SectionSearchEvents;
