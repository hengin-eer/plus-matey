import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import type { Dispatch, SetStateAction, FC } from 'react';

type Props = {
	isPublic: boolean;
	setIsPublic: Dispatch<SetStateAction<boolean>>;
};

// TODO: isPublicはFirestoreから取得するようにする
const SectionHeading: FC<Props> = ({ isPublic, setIsPublic }) => {
	return (
		<section className="lg:sticky lg:top-5 lg:z-20 flex justify-between px-4 py-3 lg:px-6 lg:py-4 w-full bg-white border border-gray rounded-2xl shadow-md">
			<div className="flex items-center gap-4 lg:gap-6">
				<Link href="/manage">
					<Icon
						icon="material-symbols-light:keyboard-arrow-left"
						className="size-8 lg:size-10"
					/>
				</Link>

				{/* NOTE: レスポンシブ対応でいじる必要あるかな？ */}
				<p className="flex items-center gap-2 text-sm lg:text-base">
					<span
						className={`size-3 lg:size-4 rounded-full ${isPublic ? 'bg-primary-green' : 'bg-primary-yellow'}`}
					></span>
					{isPublic ? '公開中' : '編集中'}
				</p>
			</div>

			<div className="flex items-center gap-4">
				{/* TODO: ハンバーガーメニューで隠す等、レスポンシブ対応を考える */}
				<div className="absolute lg:static flex flex-col lg:flex-row items-center gap-4">
					{isPublic && (
						<button
							onClick={() => setIsPublic(false)}
							className="px-5 py-2 text-base bg-light-gray border-2 border-primary-red rounded-full"
						>
							公開終了する
						</button>
					)}

					<button className="flex items-center gap-1 px-4 py-3 bg-light-gray">
						<Icon
							icon="material-symbols-light:delete-forever-rounded"
							className="size-8 text-gray"
						/>
						<p>削除する</p>
					</button>

					<button className="flex items-center gap-1 px-4 py-3 bg-light-gray">
						<Icon
							icon="material-symbols-light:content-copy-rounded"
							className="size-8 text-gray"
						/>
						<p>コピーを作成する</p>
					</button>
				</div>

				<button
					type="submit"
					className={`flex items-center gap-1 px-4 py-3 rounded-lg ${isPublic ? 'bg-primary-yellow' : 'bg-primary-green'}`}
				>
					<Icon
						icon="material-symbols-light:autorenew-rounded"
						className="size-8"
					/>
					<p>{isPublic ? '更新する' : '公開する'}</p>
				</button>
			</div>
		</section>
	);
};

export default SectionHeading;
