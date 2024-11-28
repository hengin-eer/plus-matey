'use client';

import { DepartmentKey, EventData, GradeKey, SexKey } from '@/types/events';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FC, useMemo, useState } from 'react';
import GrayBox from './GrayBox';
import Image from 'next/image';
import PopupConfirmApply from './PopupConfirmApply';
import {
	applyEventFirestoreAction,
	cancelEventFirestore,
} from '@/app/actions/firestoreAction';
import { useSession } from 'next-auth/react';
import LinkToExternal from '../LinkToExternal';

type Props = {
	item: EventData;
};

const EventCard: FC<Props> = ({ item }) => {
	const { data: session } = useSession();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isFavoriteButtonClicked, setIsFavoriteButtonClicked] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [isApplied, setIsApplied] = useState(false);

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

	const handleApply = () => {
		setIsApplied(!isApplied);
	};

	const handlePopupOpen = () => {
		setIsPopupOpen(false);
	};

	const ApplyEventAction = async (userId: string, eventId: string) => {
		const res = isApplied
			? await cancelEventFirestore(userId, eventId)
			: await applyEventFirestoreAction(userId, eventId);

		if (res.success) {
			alert(res.message);
			handleApply();
		} else {
			console.log(res.message);
			alert(res.message);
		}

		handlePopupOpen();
	};

	// TODO: Server sideで出来そうなら後でリファクタしよう！！
	useMemo(() => {
		if (session && session.user.id) {
			const defaultIsApplied = Array.isArray(item.appliedUserIds)
				? item.appliedUserIds.includes(session?.user.id)
				: false;

			setIsApplied(defaultIsApplied);
		}
	}, [session, item.appliedUserIds]);

	return (
		<>
			{isPopupOpen && (
				<PopupConfirmApply
					isApplied={isApplied}
					handlePopupOpen={handlePopupOpen}
					ApplyEventAction={() => ApplyEventAction(item.author.id, item.id)}
				/>
			)}
			<div
				className="flex flex-col gap-6 pt-6 px-5 rounded-md bg-white text-black border border-gray"
				key={item.id}
			>
				<div className="flex flex-col gap-8 items-center xl:items-start xl:flex-row-reverse">
					<div className="flex flex-col items-start gap-7 w-full">
						{item.thumbnail?.base64 && (
							<Image
								src={item.thumbnail.base64}
								alt={item.thumbnail.name}
								className="w-full h-[200px] md:h-[240px] rounded-lg object-cover object-center"
							/>
						)}
						<h2 className="text-xl xl:text-2xl">{item.title}</h2>

						<div className="flex flex-row items-center gap-5">
							<GrayBox type="close_at">{item.close_at}</GrayBox>

							<GrayBox type="number_recruited">
								{item.appliedUserIds.length} / {item.number_recruited}
								<span className="text-base">人</span>
							</GrayBox>
						</div>

						<button
							className="w-full border border-gray rounded-md text-high-gray flex items-center justify-center gap-1"
							onClick={handleDetails}
						>
							<Icon
								icon="material-symbols-light:keyboard-arrow-down-rounded"
								className="mt-1 size-7"
							/>
							<p className="pr-7 text-xs">
								{isDetailsOpen ? '閉じる' : 'もっと見る'}
							</p>
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
								<div className="flex items-center gap-2">
									<p>開催日時:</p>
									<p>{item.held_at}</p>
								</div>
								{item.contactFormURL && (
									<div className="flex flex-col items-start gap-2">
										<p className="text-lg">お問い合わせフォーム:</p>
										<LinkToExternal href={item.contactFormURL}>
											{item.contactFormURL}
										</LinkToExternal>
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				<div className="py-3 w-full border-t gap-5 border-gray flex justify-between flex-col-reverse xl:flex-row ">
					<div className="gap-5 flex place-content-center">
						<button
							onClick={() => setIsPopupOpen(true)}
							className={
								isApplied
									? 'transition text-xs flex items-center rounded-md border border-black  px-2 py-[6px] text-black bg-primary-red active:scale-95'
									: 'transition text-xs flex items-center rounded-md border border-black  px-2 py-[6px] text-black bg-primary-green active:scale-95'
							}
						>
							<div className="transition duration-300">
								{isApplied ? (
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
								{isApplied ? '申し込みをキャンセル' : 'イベントに申し込む'}
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
								{isFavoriteButtonClicked ? 'お気に入り済み' : 'お気に入り追加'}
							</p>
						</button>
					</div>

					<div className="flex flex-row items-center gap-3 place-content-center">
						<Image
							src={item.author.image}
							width={500}
							height={500}
							alt="icon"
							className="size-8 aspect-square rounded-full"
						/>
						<p className="text-sm opacity-100">{item.author.name}</p>
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
		</>
	);
};

export default EventCard;
