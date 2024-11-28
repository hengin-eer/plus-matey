import Link from 'next/link';

function Done({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const message = searchParams.message;

	return (
		<div className="pt-20 grid place-items-center">
			<div className="flex flex-col items-center gap-7 py-8 px-10 bg-white rounded-lg shadow-md">
				<p className="text-lg">{message ? message : '不正なアクセスです。'}</p>
				<div className="flex flex-col gap-4">
					<Link
						href="/"
						className="py-3 px-5 rounded-md bg-light-gray text-center"
					>
						トップへ戻る
					</Link>
					<Link
						href="/manage"
						className="py-3 px-5 rounded-md bg-primary-green text-center"
					>
						イベント管理ページへ
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Done;
