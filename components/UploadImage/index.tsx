import React, { FormEvent, useRef, useState } from 'react';
import { BASE_URL, URL } from '../../constants/url';
import Button, { Size } from '../Button';

interface Props {
	onUpload(base64: string): void;
	noButton?: boolean;
}

const allowedFileExtensions = ['jpg', 'jpeg', 'png'];

const UploadImage = ({
	onUpload,
	noButton = false,
}: Props) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);

	const [uploadURL, setUploadURL] = useState<{
		url: '',
		id: '',
	} | null>(null);

	const onUploadPhoto = async () => {
		setUploadURL(null);
		const response = await fetch(`${BASE_URL}upload_image`);
		const data = await response.json();
		// setTimeout(() => {
			setUploadURL({
				url: data.result.uploadURL,
				id: data.result.id,
			});
		// }, 500);
	};

	return (
		<>
			<form onSubmit={async (event) => {
				// if (uploadURL) onUpload(uploadURL.id);
				// setUploadURL(null);
				// console.log('successfully submited', event);
				event.preventDefault();
				try {
					const formData = new FormData();
					// @ts-ignore
					formData.append('file', inputRef?.current?.files?.[0]);
					const pres = await fetch(uploadURL?.url || '', {
						method: 'POST',
						body: formData,
					});
					const d = await pres.json();
					onUpload(d.result.id);
					console.log(d);
					setUploadURL(null);
				} catch(err) {
					console.error(err);
				}
			}} ref={formRef} style={{
				display: 'grid',
				gridTemplateRows: 'min-content min-content',
				justifyContent: 'flex-start',
				gap: 15,
			}}
				id="form"
				target="nowhere"
				method="post"
				action={uploadURL?.url || ''}
				encType="multipart/form-data"
			>
				<input id="file" name="file" onChange={onUploadPhoto} ref={inputRef} type="file" accept=".jpg, .jpeg, .png" />
				{uploadURL && (
					<Button size={Size.MEDIUM} label={'Добавить фото'} buttonType="submit" />
				)}
			</form>
		</>
	);
};

export default UploadImage;
