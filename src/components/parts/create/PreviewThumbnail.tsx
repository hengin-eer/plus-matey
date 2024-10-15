'use client';

import { ChangeEvent, useState } from 'react';

const PreviewThumbnail = () => {
	// TODO: 画像サイズの制限、圧縮が可能であればやる！
	const [previewSrc, setPreviewSrc] = useState('/no-image.png');
	const decodeImageSrc = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const imageObject = e.target.files[0];
		console.log('👋👋👋', imageObject);

		if (imageObject) setPreviewSrc(window.URL.createObjectURL(imageObject));
	};

	return (
		<div className="mt-5">
			<label className="px-4 py-3 bg-light-gray border border-gray rounded-md text-base cursor-pointer">
				サムネイル画像を選択
				<input
					type="file"
					name="thumbnail"
					accept="image/*"
					onChange={(e) => decodeImageSrc(e)}
					className="hidden"
				/>
			</label>
			<img
				className="mt-6 max-h-[270px]"
				src={previewSrc}
				alt="プレビュー画像"
			/>
		</div>
	);
};

export default PreviewThumbnail;
