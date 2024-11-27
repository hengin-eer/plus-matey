'use client';

import { FC, ReactNode } from 'react';

type Props = {
	type: 'close_at' | 'number_recruited';
	children: ReactNode;
};

const GrayBox: FC<Props> = ({ type, children }) => {
	const convertedHeading = {
		close_at: '募集締め切り',
		number_recruited: '募集人数',
	};

	return (
		<div className="flex flex-col gap-1 px-3 py-2 w-full min-w-max bg-light-gray rounded-lg">
			<p className="text-xs">{convertedHeading[type]}</p>
			<p className="flex items-center gap-2 text-2xl">
				{/* todo:締め切りが近づくと文字色をかえる */}
				{/* todo:締め切り間近をだす */}
				{/* todo:締め切り日時*/}
				{children}
			</p>
		</div>
	);
};

export default GrayBox;
