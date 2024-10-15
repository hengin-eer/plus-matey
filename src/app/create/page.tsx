import SectionHeading from '@/components/sections/create/SectionHeading';
import SectionLeftForms from '@/components/sections/create/SectionLeftForms';
import SectionRightForms from '@/components/sections/create/SectionRightForms';

function Create() {
	return (
		<main className="px-10">
			<form className="pt-5 pb-20 flex flex-col gap-10">
				{/* 
				NOTE: Server Actionを使って実装
				TODO: 暫定的に固定幅にしている。後でレスポンシブの設定をする
				 */}

				<SectionHeading />

				{/* TODO: レスポンシブ対応しましょう！！ */}
				<div className="w-full flex justify-center gap-6">
					<SectionLeftForms />
					<SectionRightForms />
				</div>
			</form>
		</main>
	);
}

export default Create;
