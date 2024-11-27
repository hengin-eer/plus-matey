import { FC } from 'react';
import PageHeading from '../parts/PageHeading';
import { EventData } from '@/types/events';
import EventCard from '../parts/index/EventCard';

interface Props {
	eventList: EventData[];
	total: number;
}

const SectionNewEventList: FC<Props> = ({ eventList, total }) => {
	return (
		<section className="w-full max-w-[1024px]">
			<PageHeading>{`新着イベント (${total}件)`}</PageHeading>
			<div className="flex flex-col gap-8 mb-20">
				{eventList.map((item) => (
					<EventCard key={item.id} item={item} />
				))}
			</div>
		</section>
	);
};

export default SectionNewEventList;
