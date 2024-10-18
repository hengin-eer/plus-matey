'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { type Dispatch, type SetStateAction, type FC, useState } from 'react';

type Props = {
	isPublic: boolean;
	setIsPublic: Dispatch<SetStateAction<boolean>>;
};

// TODO: isPublicはFirestoreから取得するようにする
const SectionHeading: FC<Props> = ({ isPublic, setIsPublic }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClickMenu = () => {
		setIsOpen(!isOpen);
	};

	const stopEventPublic = () => {
		alert('このイベントを削除しますか？');
		handleClickMenu();

		if (true) {
			setIsPublic(false);
		}
	};

	const deleteEvent = () => {
		alert('このイベントを削除しますか？');
		handleClickMenu();
	};

	const copyEvent = () => {
		alert('このイベントのコピーを作成します。よろしいでしょうか？');
		handleClickMenu();
	};

	return (
		<section className="sticky top-5 z-20 flex justify-between mx-auto px-4 py-3 lg:px-6 lg:py-4 w-full max-w-[1440px] bg-white border border-gray rounded-2xl shadow-md">
			<div className="flex items-center gap-2 lg:gap-4">
				<Link href="/manage">
					<Icon
						icon="material-symbols-light:keyboard-arrow-left"
						className="size-8 lg:size-10"
					/>
				</Link>

				<p className="flex items-center gap-2 text-base">
					<span
						className={`size-4 rounded-full ${isPublic ? 'bg-primary-green' : 'bg-primary-yellow'}`}
					></span>
					{isPublic ? '公開中' : '編集中'}
				</p>
			</div>

			<div className="flex items-center gap">
				<span
					className="block p-2 rounded-md"
					onClick={() => handleClickMenu()}
				>
					<Icon
						icon="material-symbols-light:more-horiz"
						className="size-8 text-foreground"
					/>
				</span>

				<div className="relative">
					<div
						className={`absolute top-8 -right-20 md:top-6 md:right-2 flex flex-col items-center w-max bg-white border border-gray rounded-md shadow-md duration-300 transition-all ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
					>
						{isPublic && (
							<button
								onClick={() => stopEventPublic()}
								className="flex items-center gap-2 px-4 py-3 w-full transition-colors duration-300 hover:bg-light-gray"
							>
								<Icon
									icon="material-symbols-light:stop-circle-rounded"
									className="size-8 text-primary-red"
								/>
								<p>公開終了する</p>
							</button>
						)}

						<button
							onClick={() => deleteEvent()}
							className="flex items-center gap-2 px-4 py-3 w-full transition-colors duration-300 hover:bg-light-gray"
						>
							<Icon
								icon="material-symbols-light:delete-forever-rounded"
								className="size-8 text-gray"
							/>
							<p>削除する</p>
						</button>

						<button
							onClick={() => copyEvent()}
							className="flex items-center gap-2 px-4 py-3 w-full transition-colors duration-300 hover:bg-light-gray"
						>
							<Icon
								icon="material-symbols-light:content-copy-rounded"
								className="size-8 text-gray"
							/>
							<p>コピーを作成する</p>
						</button>
					</div>
				</div>

				<button
					type="submit"
					className={`flex items-center gap-1 px-3 lg:px-4 py-3 rounded-lg text-sm lg:text-base ${isPublic ? 'bg-primary-yellow' : 'bg-primary-green'}`}
				>
					<Icon
						icon="material-symbols-light:autorenew-rounded"
						className="size-6 lg:size-8"
					/>
					<p>{isPublic ? '更新する' : '公開する'}</p>
				</button>
			</div>
		</section>
	);
};

export default SectionHeading;
