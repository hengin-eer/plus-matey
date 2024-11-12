import { FC } from 'react';

type Props = {
	heading: string;
	selectName: string;
	ariaLabel: string;
	dataList: {
		id: string;
		name: string;
	}[];
	required?: boolean;
};

const Select: FC<Props> = ({
	heading,
	selectName,
	ariaLabel,
	dataList,
	required = false,
}) => {
	return (
		<div className="max-w-[480px]">
			<p className="mb-3 text-lg">
				{required && <span className="mr-1 text-primary-red">*</span>}
				{heading}
			</p>
			<select
				className="w-full px-4 py-2 rounded-sm bg-light-gray text-foreground outline-none placeholder:text-base placeholder:text-gray focus-visible:outline-gray transition-all duration-300"
				name={selectName}
				aria-label={ariaLabel}
				defaultValue={''}
				required={required}
			>
				{dataList.map((item) => (
					<option key={item.id} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
