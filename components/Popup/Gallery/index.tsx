import React, { FormEvent, ReactNode, useContext, useRef } from 'react';
import { DataContext } from '../../../contexts/Data';
import {UserInfoContext} from '../../../contexts/UserInfo';
import Button, { Size } from '../../Button';

import ButtonClose from '../../ButtonClose';

import styles from './Gallery.module.scss';

interface Props {
  label: ReactNode;
  imgs: string[];
  onUpload(base64: string): void;
  onDeleteImage(index: number): void;
  onClose(): void;
}
const allowedFileExtensions = ['jpg', 'jpeg', 'png'];
const Gallery = ({
  label,
  onDeleteImage,
  imgs,
  onClose,
  onUpload,
}: Props) => {
  const { canEdit } = useContext(UserInfoContext);
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
    <div className={`${styles.popupContent} popupContent`}>
      <div className={styles.content}>
        <h4 className={styles.title}>{label}</h4>
        <ButtonClose className={styles.buttonClose} onClick={onClose} />
        <div className={styles.imgsBlock}>
          {imgs.map((item, i) => (
            <div key={i} className={styles.img} style={{
              background: `url(${item})`,
            }}>
              {canEdit && imgs.length > 1 && (
                <ButtonClose width={15} height={15} className={styles.del} onClick={() => onDeleteImage(i)}/>
              )}
            </div>
          ))}
          {canEdit && (
        <form ref={formRef} style={{
          display: 'grid',
          gridTemplateRows: 'min-content min-content',
          justifyContent: 'flex-start',
          gap: 15,
        }} id="form" onSubmit={onUploadPhoto}>
          <input ref={inputRef} type="file" accept=".jpg, .jpeg, .png" />
          <Button size={Size.MEDIUM} label={'Добавить фото'} buttonType="submit" />
        </form>
      )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
