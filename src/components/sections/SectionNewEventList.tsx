'use client';

import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import PageHeading from '../parts/PageHeading';
import Image from 'next/image';
import { DepartmentKey, EventData, GradeKey, SexKey } from '@/types/events';
import GrayBox from '../parts/index/GrayBox';

interface Props {
	eventList: EventData[];
	total: number;
}

const SectionNewEventList: FC<Props> = ({ eventList, total }) => {
	const [isApplyButtonClicked, setIsApplyButtonClicked] = useState(false);
	const [isFavoriteButtonClicked, setIsFavoriteButtonClicked] = useState(false);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);

	const iconimage = '/kirito.png';
	const acountname = '上級修剣士 ユージオ';

	const departmentMap: Record<DepartmentKey, string> = {
		e: '電気情報工学科',
		m: '機械工学科',
		c: '都市システム工学科',
		a: '建築学科',
	};

	const sexMap: Record<SexKey, string> = {
		male: '男性',
		female: '女性',
		both: '性別問わず',
	};

	const gradeMap: Record<GradeKey, string> = {
		'grade-1': '1年',
		'grade-2': '2年',
		'grade-3': '3年',
		'grade-4': '4年',
		'grade-5': '5年',
		'grade-6': '専攻科',
		'grade-7': '教員',
	};

	const handleDetails = () => {
		setIsDetailsOpen(!isDetailsOpen);
	};

	console.log(eventList);

	return (
		<section className="w-full max-w-[1024px]">
			<PageHeading>{`新着イベント (${total}件)`}</PageHeading>

			<aside className="flex flex-col gap-8 mb-20">
				{eventList.map((item) => (
					<div
						className="flex flex-col gap-6 pt-6 px-5 rounded-md bg-white text-black border border-gray"
						key={item.id}
					>
						<div className="flex flex-col gap-8 items-center xl:items-start xl:flex-row-reverse">
							<div className="flex flex-col items-start gap-7 pb-5 w-full">
								{item.thumbnail?.base64 && (
									<img
										src={item.thumbnail.base64}
										alt={item.thumbnail.name}
										className="w-full h-[200px] md:h-[240px] rounded-lg object-cover object-center"
									/>
								)}
								<h2 className="text-xl xl:text-2xl">{item.title}</h2>

								<button className="" onClick={handleDetails}>
									<Icon icon="" className="" />
									<p>{isDetailsOpen ? '閉じる' : 'もっと見る'}</p>
								</button>

								{isDetailsOpen && (
									<div className="flex flex-col gap-7">
										<p className="text-xs xl:text-sm">{item.summary}</p>
										<div className="flex flex-col gap-3">
											<div className="flex items-center gap-2">
												<p>{'学科'}</p>
												{item.department.length === 4 ? (
													<span className="py-[2px] px-2 text-sm border border-gray rounded-full bg-department-all">
														全学科
													</span>
												) : (
													item.department.map((item) => (
														<span
															key={item}
															className={`py-[2px] px-2 text-sm border border-gray rounded-full bg-department-${item}`}
														>
															{departmentMap[item]}
														</span>
													))
												)}
											</div>
											<div className="flex items-center gap-2">
												<p>{'性別'}</p>
												<span
													className={`py-[2px] px-2 text-sm border border-gray rounded-full bg-${item.sex}`}
												>
													{sexMap[item.sex]}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<p>{'学年'}</p>
												{item.grade.length === 7 ? (
													<span className="py-[2px] px-2 text-sm border border-gray rounded-full bg-white">
														全学年
													</span>
												) : (
													item.grade.map((item) => (
														<span
															key={item}
															className="py-[2px] px-2 text-sm border border-gray rounded-full bg-white"
														>
															{gradeMap[item]}
														</span>
													))
												)}
											</div>
										</div>
									</div>
								)}
							</div>

							<div className="flex flex-row xl:flex-col items-center xl:items-start gap-5">
								<GrayBox type="close_at">{item.close_at}</GrayBox>

								<GrayBox type="number_recruited">
									1 / {item.number_recruited}
									<span className="text-base">人</span>
								</GrayBox>
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
									src={iconimage}
									width={500}
									height={500}
									alt="icon"
									className="h-[40px] w-[40px] aspect-square"
								/>
								<p className="text-xs opacity-100">{acountname}</p>
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
			</aside>
		</section>
	);
};

export default SectionNewEventList;
