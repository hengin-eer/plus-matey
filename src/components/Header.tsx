import Image from 'next/image';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FC } from 'react';

const Header: FC = () => {
	const headerLinkList = [
		{
			url: '/about',
			name: 'Plus Mateyとは',
		},
		{
			url: '/bookmarked',
			name: 'ブックマーク済み',
		},
		{
			url: '/following',
			name: 'フォロー中',
		},
		{
			url: '/manage',
			name: 'イベント管理',
		},
		{
			url: '/new',
			name: '新着イベント',
		},
	];

	return (
		<header className="px-[40px] py-[24px] w-full flex justify-between items-center border-b border-black">
			<Link href="/">
				<Image
					src="/logo.svg"
					width={629}
					height={159}
					alt="logo"
					className="h-[50px] w-auto"
				/>
			</Link>
			<nav className="flex space-x-[22.4px]">
				<ul className="text-sm space-x-[22.4px] text-primary-red">
					{headerLinkList.map((item) => (
						<Link
							href={item.url}
							key={item.url}
							className="hover:text-primary-pink"
						>
							{item.name}
						</Link>
					))}
				</ul>

				{/* イベント作成ボタン */}
				<Link href="/create">
					<button className="text-sm space-x-[22.4px]">
						{/* プラスアイコン */}
						<p className="text-xs">イベントを作成</p>
					</button>
				</Link>

				{/* アカウントのアイコンの表示 */}
				<Menu as="div" className="relative inline-block text-left items-center">
					<div>
						<MenuButton className="inline-flex w-full justify-center px-3 py-2 hover:bg-primary-red">
							<Image
								src="/kirito.png"
								width={500}
								height={500}
								alt="icon"
								className="h-[30px] w-auto"
							/>
						</MenuButton>
					</div>
					<MenuItems
						transition
						className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white transiton focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
					>
						<div className="py-1">
							<MenuItem>
								<Link
									href="/profile"
									className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 border-b border-black hover:bg-primary-red"
								>
									プロフィール
								</Link>
							</MenuItem>
							<MenuItem>
								<Link
									href="/manage"
									className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 border-b border-black hover:bg-primary-red"
								>
									イベント管理
								</Link>
							</MenuItem>
							<MenuItem>
								<Link
									href="/settings"
									className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 border-b border-black hover:bg-primary-red"
								>
									設定
								</Link>
							</MenuItem>
							<form action="logout" method="POST">
								<MenuItem>
									<button
										type="submit"
										className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:bg-primary-red"
									>
										サインアウト
									</button>
								</MenuItem>
							</form>
						</div>
					</MenuItems>
				</Menu>
			</nav>
		</header>
	);
};

export default Header;
