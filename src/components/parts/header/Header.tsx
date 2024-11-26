import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import HeaderNav from './HeaderNav';

const Header: FC = async () => {
	return (
		<header className="px-6 md:px-10 py-4 w-full flex justify-between items-center border-b border-black">
			<Link href="/">
				<Image
					src="/logo.svg"
					width={629}
					height={159}
					alt="logo"
					className="h-8 w-auto"
				/>
			</Link>

			<HeaderNav />
		</header>
	);
};

export default Header;
