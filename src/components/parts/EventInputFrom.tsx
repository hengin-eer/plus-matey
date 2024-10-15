import { FC, ReactElement } from 'react';

type Props = {
	title: string;
	summary?: string;
	children: ReactElement;
	isRequired?: boolean;
};

const EventInputForm: FC<Props> = ({
	title,
	summary,
	children,
	isRequired = false,
}) => {
	return (
		<div className="flex flex-col w-full px-5 py-6 bg-white border border-gray rounded-md">
			<h3 className={`flex items-center gap-2 text-xl ${isRequired && ''}`}>
				<span>{title}</span>

				{isRequired && (
					<span className="px-2 py-1 bg-primary-red rounded-sm text-xs text-white">
						必須
					</span>
				)}
			</h3>
			{summary && <p className="text-sm mt-3">{summary}</p>}
			<div className="mt-5">{children}</div>
		</div>
	);
};

export default EventInputForm;
