import SectionNewEventList from '@/components/sections/SectionNewEventList';
import SectionSearchEvents from '@/components/sections/SectionSearchEvents';
import { getFirestoreAction } from './actions/firestoreAction';

export default async function Home() {
	// TODO: イベント追加後にLinkでこのページに飛ぶと、データが更新されていないのでどうにかしたい
	const { eventList, total } = await getFirestoreAction();
	return (
		<main className="flex flex-col lg:flex-row gap-[100px] mt-10 mx-auto px-6 md:px-10">
			<SectionSearchEvents />
			<SectionNewEventList eventList={eventList} total={total} />
		</main>
	);
}
