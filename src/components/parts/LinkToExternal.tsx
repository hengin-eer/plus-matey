import { FC, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	href: string;
	className?: string;
};

const LinkToExternal: FC<Props> = ({ children, href, className }) => {
	return (
		<a
			className={`text-primary-yellow-green underline ${className}`}
			href={href}
			rel="noopener noreferrer"
		>
			<p className="[overflow-wrap:anywhere]">{children}</p>
		</a>
	);
};

export default LinkToExternal;
