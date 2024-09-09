import { FC, HTMLAttributes } from 'react';

type Props = {
	children: string;
	className?: string | undefined;
};

const PageHeading: FC<Props> = ({ children, className }) => {
	return (
		<div className="w-full pb-2 mb-5 border-b-2 border-gray">
			<h2 className={`text-2xl text-black ${className}`}>{children}</h2>
		</div>
	);
};

export default PageHeading;
