'use client';

import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import PageHeading from '../parts/PageHeading';
import Image from 'next/image';


const SectionNewEventList: FC = () => {
	const [isApplyButtonClicked, setIsApplyButtonClicked] = useState(false);
	const [isFavoriteButtonClicked, setIsFavoriteButtonClicked] = useState(false);
	const [isDetailButtonClicked, setIsDetailButtonClicked] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);

	// データベース接続構造体
	const numberOfEvent = '100';
	const eventElements = [
		{
			eventname: 'system call enhance armament',
			eventdetail:
				'system call jenerate sarmal element form element arow shape discharge',
			eventheading: '咲け青薔薇',
			recuruitingdate: '6/24(月)',
			recuruitingpeople: '1 / 3',
			iconimage: '/kirito.png',
			acountname: '上級修剣士 ユージオ',
		},
	];
	return (
		<section className="w-full">
			<PageHeading>{`新着イベント (${numberOfEvent}件)`}</PageHeading>

			{eventElements.map((item) => (
				<div
					className="bg-white text-black rounded-md px-5 pt-6 gap-5"
					key={item.eventname} //キーをイベントの名前に設定
				>
					{/* イベント内容 */}
					<div className="flex flex-col gap-7 place-content-start xl:flex-row-reverse">
						<div className="flex flex-col gap-7">
							<h1 className="text-2xl">{item.eventname}</h1>
							<p className="text-xs">{item.eventheading}</p>

							{/* todo:カーソル判定の縮小 */}
							<button
								className="flex items-center transitoin delay-150 duration-300 w-max"
								onClick={() => setIsDetailButtonClicked(!isDetailButtonClicked)}
							>
								<Icon
									icon={
										'material-symbols-light:arrow-drop-down-circle-outline-rounded'
									}
									className={`transition text-[18px] ${
										isDetailButtonClicked
											? 'duration-300 rotate-0'
											: 'duration-300 rotate-[-90deg]'
									}`}
								/>

								<p className="text-xs transition duration-300">
									{isDetailButtonClicked ? '閉じる' : 'もっと見る'}
								</p>
							</button>
							<div>
								<p
									className={`text-xs transition duration-300${
										isDetailButtonClicked ? ' opacity-100' : ' opacity-0'
									}`} //TODO：hiddenにしないとテキストの大きさ分の謎の空白できる
								>
									{item.eventdetail}
								</p>
							</div>

							{/* todo:募集条件 */}
							{/* todo:スキルタグ */}
						</div>

						<div className="flex flex-col xl:flex-row">
							<div className="px-4 py-6 flex flex-row xl:flex-col gap-5 ">
								{/* 募集締め切り */}
								<div className="px-3 py-2 bg-light-gray rounded-md w-full text-center xl:text-start">
									<p className="text-xs text-black">募集締め切り</p>
									<p className="text-2xl place-content-center text-black">
										{/* todo:締め切りが近づくと文字色をかえる */}
										{/* todo:締め切り間近をだす */}
										{/* todo:締め切り日時*/}
										{item.recuruitingdate}
									</p>
								</div>
								{/* 募集人数 */}
								<div className="px-3 py-2 bg-light-gray rounded-md w-full text-center xl:text-start">
									<p className="text-xs text-black">募集人数</p>
									<div className="flex space-x-3 place-content-center xl:text-start xl:place-content-start">
										<p className="text-2xl text-black">
											{/* todo:残り人数が少なくなったら文字色をかえる */}
											{/* todo:残り人数わずかをだす */}
											{/* todo:募集人数 */}
											{item.recuruitingpeople}
										</p>
										<p className="text-base py-1">人</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="py-3 w-full border-t gap-5 border-gray flex justify-between flex-col-reverse xl:flex-row ">
						<div className="gap-5 flex place-content-center">
							{/* 申し込みボタン */}
							<button
								onClick={() => setIsApplyButtonClicked(!isApplyButtonClicked)}
								className={
									isApplyButtonClicked
										? 'transition text-xs flex items-center rounded-md border border-black  px-2 py-[6px] text-black bg-primary-red active:scale-95'
										: 'transition text-xs flex items-center rounded-md border border-black  px-2 py-[6px] text-black bg-primary-green active:scale-95'
								}
							>
								<div className="transition duration-300">
									{isApplyButtonClicked ? (
										<Icon
											icon={'material-symbols-light:event-available-rounded'}
											className="transition size-8"
										/>
									) : (
										<Icon
											icon={'material-symbols-light:event-busy-rounded'}
											className="transition size-8"
										/>
									)}
								</div>
								<p className="transition duraition-300 ">
									{isApplyButtonClicked
										? '申し込みをキャンセル'
										: 'イベントに申し込む'}
								</p>
							</button>
							{/* お気に入りボタン */}
							<button
								onClick={() =>
									setIsFavoriteButtonClicked(!isFavoriteButtonClicked)
								}
								className="text-xs flex items-center rounded-md border border-black px-7 py-[6px] transition text-black bg-light-gray active:scale-95 xl:px-2"
							>
								<Icon
									icon={'material-symbols:bookmark-star-rounded'}
									className={
										isFavoriteButtonClicked
											? 'size-8 text-primary-red duration-300 '
											: 'size-8 text-gray duration-300'
									}
								/>
								<p className="hidden xl:inline-block">
									{isFavoriteButtonClicked
										? 'お気に入り済み'
										: 'お気に入り追加'}
								</p>
							</button>
						</div>

						<div className="flex flex-row items-center gap-3 place-content-center">
							<Image
								src={item.iconimage}
								width={500}
								height={500}
								alt="icon"
								className="h-[40px] w-[40px] aspect-square"
							/>
							<p className="text-xs opacity-100">{item.acountname}</p>
							{/* アカウント名 */}
							<button
								className="flex rounded-full border border-primary-yellow-green text-primary-yellow-green items-center text-[10px] py-1 px-[6px] transition duration-300 hover:text-primary-green hover:border-primary-green active:scale-95"
								onClick={() => setIsFollowed(!isFollowed)}
							>
								<Icon
									icon={'material-symbols-light:add-circle-outline-rounded'}
									className="size-4"
								/>
								<p>{isFollowed ? 'フォロー済み' : 'フォローする'}</p>
							</button>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default SectionNewEventList;
