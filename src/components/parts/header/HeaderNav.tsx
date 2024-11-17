import { signInAction, signOutAction } from '@/app/actions/auth';
import { auth, signIn } from '@/auth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const HeaderNav: FC = async () => {
	const session = await auth();

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

	if (!session?.user)
		return (
			<form action={signInAction}>
				<button
					className="flex items-center gap-1 px-3 py-1 bg-primary-green border border-foreground rounded-full"
					type="submit"
				>
					<Icon
						icon="material-symbols-light:login-outline-rounded"
						className="size-8"
					/>
					<p className="text-sm">ログインする</p>
				</button>
			</form>
		);

	return (
		<form action={signOutAction}>
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

				<Link href="/create">
					<button className="text-sm gap-1 flex items-center bg-white rounded-md border border-black pl-3 pr-5 py-[4px] transition-colors duration-300  hover:bg-primary-red hover:text-white">
						<Icon
							icon="material-symbols-light:add-circle-outline-rounded"
							className="size-8"
						/>
						<p className="text-xs">イベントを作成</p>
					</button>
				</Link>

				<Menu as="div" className="relative text-left items-center">
					<div>
						{/* NOTE: アカウントのアイコン */}
						<MenuButton className="flex w-max items-center justify-center hover:bg-light-gray transition duration-300 hover:scale-95">
							<Image
								src={session.user.image || '/kirito.png'}
								width={500}
								height={500}
								alt="icon"
								className="h-[40px] w-[40px] aspect-square rounded-full"
							/>
						</MenuButton>
					</div>
					<MenuItems
						transition
						className="absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white transiton focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
					>
						{/* NOTE: メニューボタン一覧 */}
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
						</div>
					</MenuItems>
				</Menu>
			</nav>
		</form>
	);
};

export default HeaderNav;
