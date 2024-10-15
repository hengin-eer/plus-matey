import SectionNewEventList from '@/components/sections/SectionNewEventList';
import SectionSearchEvents from '@/components/sections/SectionSearchEvents';

export default function Home() {
	return (
		<main className="flex gap-[100px] mt-10 px-10">
			<SectionSearchEvents />
			<SectionNewEventList />
		</main>
	);
}
