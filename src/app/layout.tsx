import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';

const noto_sans_jp = Noto_Sans_JP({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${noto_sans_jp.className} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
