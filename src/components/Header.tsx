import Image from 'next/image';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FC } from 'react';
import { Icon } from '@iconify/react';

const Header: FC = () => {
	// ヘッダー内のリンク先
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

	// アイコンのメニューのボタン
	const headerMenuItems = [
		{
			icon: 'material-symbols-light:account-circle',
			url: '/profile',
			name: 'プロフィール',
		},
		{
			icon: 'material-symbols-light:data-check-rounded',
			url: '/manage',
			name: 'イベント管理',
		},
		{
			icon: 'material-symbols-light:settings-outline-rounded',
			url: '/settings',
			name: '設定',
		},
	];

	return (
		<header className="px-[40px] py-[24px] w-full flex justify-between items-center border-b border-black">
			{/* ロゴ */}
			<Link href="/">
				<Image
					src="/logo.svg"
					width={629}
					height={159}
					alt="logo"
					className="h-[50px] w-auto"
				/>

				{/* ヘッダーのリンク */}
			</Link>
			<nav className="flex gap-[24px] items-center">
				<ul className="text-base flex gap-[40px] text-primary-red">
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
					<button className="text-sm gap-1 flex items-center bg-white rounded-md border border-black pl-3 pr-5 py-[4px] transition-colors duration-300  hover:bg-primary-red hover:text-white">
						<Icon
							icon="material-symbols-light:add-circle-outline-rounded"
							className="size-8"
						/>
						<p className="text-xs">イベントを作成</p>
					</button>
				</Link>

				{/* アカウントのアイコン、クリックするとメニューを表示 */}
				<Menu as="div" className="relative text-left items-center">
					<div>
						{/* アカウントのアイコン */}
						<MenuButton className="flex w-max items-center justify-center hover:bg-light-gray transition duration-300 hover:scale-95 delay-150">
							<Image
								src="/kirito.png"
								width={500}
								height={500}
								alt="icon"
								className="h-[40px] w-[40px] aspect-square"
							/>
						</MenuButton>
					</div>
					<MenuItems
						transition
						className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white transiton focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
					>
						{/* メニューボタン一覧 */}
						<div className="px-6 py-4">
							{headerMenuItems.map((item) => (
								<MenuItem key={item.icon}>
									<Link
										href={item.url}
										className="flex gap-2 border-b border-gray transition-colors duration-300 hover:bg-light-gray px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 items-center"
									>
										<Icon
											icon={item.icon}
											className="size-8 text-primary-red "
										/>
										{item.name}
									</Link>
								</MenuItem>
							))}

							{/* ログアウトボタン */}
							<form action="logout" method="POST">
								<MenuItem>
									<button
										type="submit"
										className="w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:bg-light-gray flex gap-2 items-center transition-colors duration-300"
									>
										<Icon
											icon="material-symbols-light:logout-rounded"
											className="size-8 text-primary-red"
										/>
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
