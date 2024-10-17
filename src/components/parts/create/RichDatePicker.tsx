import type { Dispatch, FC, SetStateAction } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

type Props = {
	name: string;
	value: DateValueType;
	setValue: Dispatch<SetStateAction<DateValueType>>;
};

const RichDatePicker: FC<Props> = ({ name, value, setValue }) => {
	return (
		<Datepicker
			inputClassName="
				relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full
				text-foreground border-gray-300 bg-light-gray rounded-sm tracking-wide font-light text-sm
				placeholder-gray outline-none focus-visible:outline-gray focus-visible:outline-gray
			"
			primaryColor="blue"
			popoverDirection="down"
			showShortcuts
			showFooter
			useRange={false}
			asSingle
			inputName={name}
			value={value}
			onChange={(newData) => setValue(newData)}
			required
		/>
	);
};

export default RichDatePicker;
