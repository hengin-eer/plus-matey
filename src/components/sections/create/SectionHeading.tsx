'use client'; // TODO: ゆくゆくは状態管理を無くす

import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { useState, type FC } from 'react';

const SectionHeading: FC = () => {
	const [isPublic, setIsPublic] = useState(false);

	const handleSubmit = () => {
		setIsPublic(!isPublic);
	};

	return (
		<section className="sticky top-5 flex justify-between px-6 py-4 w-full bg-white border border-gray rounded-2xl shadow-md">
			<div className="flex items-center gap-6">
				<Link href="/manage">
					<Icon
						icon="material-symbols-light:keyboard-arrow-left"
						className="size-10"
					/>
				</Link>

				<p className="flex items-center gap-2">
					<span
						className={`size-4 rounded-full ${isPublic ? 'bg-primary-green' : 'bg-primary-yellow'}`}
					></span>
					{isPublic ? '公開中' : '編集中'}
				</p>

				{isPublic && (
					<button className="px-5 py-2 bg-light-gray border-2 border-primary-red rounded-full">
						公開終了する
					</button>
				)}
			</div>

			<div className="flex items-center gap-4">
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

				<button
					// TODO: サブミット時の処理を書く（今はrequiredを避けるためにコメントアウト中）
					// type="submit"
					// onSubmit={() => handleSubmit()}
					onClick={() => handleSubmit()}
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
