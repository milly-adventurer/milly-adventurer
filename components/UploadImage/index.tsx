import React, { FormEvent, useRef } from 'react';
import Button, { Size } from '../Button';

interface Props {
  onUpload(base64: string): void;
}
const allowedFileExtensions = ['jpg', 'jpeg', 'png'];
const UploadImage = ({
  onUpload,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onUploadPhoto = (event: FormEvent) => {
    event.preventDefault();

    if (!inputRef || !inputRef.current) return;

    const fileReader = new FileReader();
    const file = inputRef.current.files?.[0];

    if (!file || !allowedFileExtensions.includes(file.name.split('.')[1])) {
      alert('Ошибка. Файл не добавлен или его расшерение не соответствует: .jpg, .jpeg, .png');
      return;
    };

    fileReader.readAsDataURL(file);

    fileReader.onload = function() {
      onUpload(fileReader.result as string);
      formRef?.current?.reset();
    };

    fileReader.onerror = function() {
      alert('Произошла ошибка при чтении файла.');
      console.log(fileReader.error);
    };
  };

  return (
    <form ref={formRef} style={{
      display: 'grid',
      gridTemplateRows: 'min-content min-content',
      justifyContent: 'flex-start',
      gap: 15,
    }} id="form" onSubmit={onUploadPhoto}>
      <input ref={inputRef} type="file" accept=".jpg, .jpeg, .png" />
      <Button size={Size.MEDIUM} label={'Добавить фото'} buttonType="submit" />
    </form>
  );
};

export default UploadImage;
