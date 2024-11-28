import { ReactNode } from 'react';

export default function ManageLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<main className="">
			<div>{children}</div>
		</main>
	);
}
