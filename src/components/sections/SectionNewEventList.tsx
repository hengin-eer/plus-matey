'use client';

import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import PageHeading from '../parts/PageHeading';
import Image from 'next/image';
import styles from './SectionNewEventList.module.css';

const SectionNewEventList: FC = () => {
	const [isApplyButtonClicked, setIsApplyButtonClicked] = useState(false);
	const [isFavoriteButtonClicked, setIsFavoriteButtonClicked] = useState(false);
	const [isDetailButtonClicked, setIsDetailButtonClicked] = useState(false);

	const eventElements = [
		{
			eventname: '',
			eventdetail: '',
			eventheading: '',
			recuruitingdate: '',
			recuruitingpeople: '',
			iconimage: '',
			acountname: '',
		},
	];
	return (
		<section className="w-full">
			<PageHeading>新着イベント</PageHeading>

			{eventElements.map((item) => (
				<div
					className="bg-white text-black rounded-md px-5 pt-6 gap-5"
					key={item.eventname}
				>
					<div className="flex">
						<div className="px-4 py-6 flex flex-col gap-5">
							{/* 募集締め切り */}
							<div className="px-3 py-2 bg-light-gray rounded-md">
								<p className="text-xs text-black">募集締め切り</p>
								<p className="text-2xl place-content-center text-black">
									{/* todo:締め切りが近づくと文字色をかえる */}
									{/* todo:締め切り間近をだす */}
									{/* todo:締め切り日時*/}
									{item.recuruitingdate}6/24（月）
								</p>
							</div>
							{/* 募集人数 */}
							<div className="px-3 py-2 bg-light-gray rounded-md">
								<p className="text-xs text-black">募集人数</p>
								<div className="flex space-x-3 text-center">
									<p className="text-2xl place-content-center text-black">
										{/* todo:残り人数が少なくなったら文字色をかえる */}
										{/* todo:残り人数わずかをだす */}
										{/* todo:募集人数 */}
										{item.recuruitingpeople}1 / 3
									</p>
									<p className="text-base py-1">人</p>
								</div>
							</div>
						</div>

						{/* イベント内容 */}
						<div className="flex flex-col gap-7">
							<h1 className="text-2xl">
								{item.eventname}system call enhance armament
							</h1>
							<p className="text-xs">{item.eventheading}咲け青薔薇</p>
							<details
								onClick={() => setIsDetailButtonClicked(!isDetailButtonClicked)}
							>
								{/* todo:カーソル判定の縮小 */}
								<summary
									className={`${styles.summary} flex items-center transitoin delay-150 duration-300 w-auto`}
								>
									<Icon
										icon={
											'material-symbols-light:arrow-drop-down-circle-outline-rounded'
										}
										className={
											isDetailButtonClicked
												? 'transition text-[18px] duration-300 rotate-0'
												: 'transition text-[18px] duration-300 rotate-[-90deg]'
										}
									/>

									<p className="text-xs transition duration-300 hover:scale-105">
										もっと見る
									</p>
								</summary>
								<div className="answer">
									<p className="text-xs">
										{item.eventdetail}
										system call jenerate sarmal element form element arow shape
										discharge
									</p>
								</div>
							</details>
							{/* todo:募集条件 */}
							{/* todo:スキルタグ */}
						</div>
					</div>

					<div className="py-3 w-full border-t border-gray flex justify-between">
						<div className="gap-5 flex">
							{/* 申し込みボタン */}
							<button
								onClick={() => setIsApplyButtonClicked(!isApplyButtonClicked)}
								className={
									isApplyButtonClicked
										? 'transition text-xs flex items-center rounded-md border border-black  px-2 py-[6px] duration-300 hover:scale-105 text-black bg-primary-green '
										: 'transition text-xs flex items-center rounded-md border border-black  px-2 py-[6px] duration-300 hover:scale-105 text-black bg-primary-red '
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
								<p className="transition duraition-300">
									{isApplyButtonClicked
										? 'イベントに申し込む'
										: '申し込みをキャンセル'}
								</p>
							</button>
							{/* お気に入りボタン */}
							<button
								onClick={() =>
									setIsFavoriteButtonClicked(!isFavoriteButtonClicked)
								}
								className="text-xs flex items-center rounded-md border border-black  px-2 py-[6px] transition delay-150 duration-300 hover:scale-105 text-black bg-light-gray "
							>
								<Icon
									icon={'material-symbols:bookmark-star-rounded'}
									className={
										isFavoriteButtonClicked
											? 'size-8 text-primary-red duration-300 '
											: 'size-8 text-gray duration-300'
									}
								/>
								<p>
									{isFavoriteButtonClicked
										? 'お気に入り済み'
										: 'お気に入り追加'}
								</p>
							</button>
						</div>

						<div className="flex items-center gap-3">
							<Image
								src="/kirito.png" //{item.iconimage}
								width={500}
								height={500}
								alt="icon"
								className="h-[40px] w-[40px] aspect-square"
							/>
							<p className="text-xs">上級修剣士 ユージオ{item.acountname}</p>
							{/* アカウント名 */}
							<div className="flex rounded-full border border-primary-yellow-green text-primary-yellow-green items-center text-[10px] py-1 px-[6px] transition duration-300 hover:text-primary-green hover:border-primary-green">
								<Icon
									icon={'material-symbols-light:add-circle-outline-rounded'}
									className="size-4"
								/>
								<button>フォローする</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default SectionNewEventList;
