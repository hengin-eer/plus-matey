import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import HeaderNav from './HeaderNav';

const Header: FC = async () => {
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

			<HeaderNav />
		</header>
	);
};

export default Header;
