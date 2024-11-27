'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';

type Props = {
	isApplied: boolean;
	handlePopupOpen: () => void;
	ApplyEventAction: () => void;
};

const PopupConfirmApply: FC<Props> = ({
	isApplied: isApplied,
	handlePopupOpen,
	ApplyEventAction,
}) => {
	const notApplyMessage =
		'このイベントの申し込みを確定します。よろしいでしょうか？';
	const appliedMessage =
		'このイベントの申し込みをキャンセルします。本当によろしいでしょうか？';

	return (
		<div className="fixed top-0 left-0 grid place-items-center h-svh w-full px-6 bg-overlay">
			<div className="flex flex-col items-center gap-10 w-full max-w-[480px] pt-8 pb-6 px-8 md:px-10 rounded-xl bg-white">
				<div className="flex items-center gap-1">
					<Icon
						icon="material-symbols-light:info-outline-rounded"
						className="mt-1 size-10"
					/>
					<h3 className="pr-5 text-3xl">確認</h3>
				</div>
				<p className="px-2">{isApplied ? appliedMessage : notApplyMessage}</p>
				<div className="flex gap-6 md:gap-8">
					<button
						className={`py-2 md:py-3 px-4 md:px-6 border rounded-lg ${isApplied ? 'bg-primary-red' : 'bg-primary-green'}`}
						onClick={ApplyEventAction}
					>
						{isApplied ? '参加を辞退する' : '参加を確定する'}
					</button>
					<button
						className="py-3 px-6 border rounded-lg bg-light-gray"
						onClick={handlePopupOpen}
					>
						閉じる
					</button>
				</div>
			</div>
		</div>
	);
};

export default PopupConfirmApply;
