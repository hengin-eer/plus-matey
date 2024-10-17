import PreviewThumbnail from '@/components/parts/create/PreviewThumbnail';
import EventInputForm from '@/components/parts/create/EventInputFrom';
import { type FC } from 'react';

const SectionLeftForms: FC = () => {
	return (
		<section className="max-w-[900px] w-full flex flex-col gap-8">
			<EventInputForm title="タイトル" isRequired>
				<label>
					<input
						type="text"
						name="title"
						placeholder="255文字以内"
						className="w-full px-4 py-2 rounded-sm bg-light-gray text-foreground outline-none placeholder:text-base placeholder:text-gray focus-visible:outline-gray transition-all duration-300"
						required
					/>
				</label>
			</EventInputForm>

			<EventInputForm
				title="説明"
				summary="イベントの趣旨や活動内容をここに書いてください。（🚧Markdown記法にも対応する予定です）"
				isRequired
			>
				<label>
					<textarea
						// TODO: Focusしている時にテキストエリアのrowsを拡張したい
						// onFocus={() => {}}
						rows={6}
						name="summary"
						placeholder="例: Co+work99班です！私たちの活動でWebアプリを作成することになりました。そこでWebアプリを作成してくださる方を募集します！"
						className="w-full px-4 py-2 rounded-sm bg-light-gray text-foreground outline-none placeholder:text-base placeholder:text-gray focus-visible:outline-gray transition-all duration-300"
						required
					/>
				</label>
			</EventInputForm>

			<EventInputForm
				title="イベント画像"
				summary="イベント紹介画面にて表示されるサムネイル画像を設定します"
			>
				<PreviewThumbnail />
			</EventInputForm>
		</section>
	);
};

export default SectionLeftForms;
