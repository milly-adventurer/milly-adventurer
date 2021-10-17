import router from 'next/dist/client/router';
import React, { FormEvent, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import { BASE_URL } from '../../../constants/url';
import { DataContext } from '../../../contexts/Data';
import { UserInfoContext } from '../../../contexts/UserInfo';
import { NewTour } from '../../../interfaces/Tour';
import Button, { Size } from '../../Button';

import ButtonClose from '../../ButtonClose';

import styles from './Gallery.module.scss';

interface Props {
  label: ReactNode;
  imgs: string[];
  onUpload(base64: string): void;
  onDeleteImage(index: number): void;
  onClose(): void;
  type: 'lastP' | 'else';
  activeButton?: number;
}
const allowedFileExtensions = ['jpg', 'jpeg', 'png'];
const Gallery = ({
  label,
  onDeleteImage,
  imgs,
  onClose,
  onUpload,
  type,
  activeButton,
}: Props) => {
  const { canEdit } = useContext(UserInfoContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { newData, getTourById } = useContext(DataContext);
  const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, newData]) as NewTour;
  const [uploadURL, setUploadURL] = useState<{
    url: '',
    id: '',
  } | null>(null);

  const onUploadPhoto = async () => {
    setUploadURL(null);

    const response = await fetch(`${BASE_URL}upload_image`);
    const data = await response.json();

    setUploadURL({
      url: data.result.uploadURL,
      id: data.result.id,
    });
  };
  const realImgs = type === 'lastP' ? tour.lastPictures : newData?.common.previous_tours[activeButton].images;
  console.log(realImgs, 'real');
  const images = realImgs.map((item, i) => (
      <div key={i} className={styles.img} style={{
        background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(https://imagedelivery.net/BjEATObSzIqdwKoVD4rQRw/${item}/public) center center`,
      }}>
        {canEdit && realImgs.length > 1 && (
          <ButtonClose width={15} height={15} className={styles.del} onClick={() => { onDeleteImage(i) }} />
        )}
      </div>
    ));

  return (
    <div className={`${styles.popupContent} popupContent`}>
      <div className={styles.content}>
        <h4 className={styles.title}>{label}</h4>
        <ButtonClose className={styles.buttonClose} onClick={onClose} />
        <div className={styles.imgsBlock}>
          {images}
          {canEdit && (
            <form ref={formRef} style={{
              display: 'grid',
              gridTemplateRows: 'min-content min-content',
              justifyContent: 'flex-start',
              gap: 15,
            }} id="form" onSubmit={async (event) => {
              // if (uploadURL) onUpload(uploadURL.id);
              // setUploadURL(null);
              // console.log('successfully submited', event);
              event.preventDefault();
              try {
                const formData = new FormData();
                formData.append('file', inputRef?.current?.files?.[0]);
                const pres = await fetch(uploadURL?.url || '', {
                  method: 'POST',
                  body: formData,
                });
                const d = await pres.json();
                onUpload(d.result.id);
                setUploadURL(null);
              } catch (err) {
                console.error(err);
              }
            }}>
              <input id="file" name="file" onChange={onUploadPhoto} ref={inputRef} type="file" accept=".jpg, .jpeg, .png" />
              {uploadURL && (
                <Button size={Size.MEDIUM} label={'Добавить фото'} buttonType="submit" />
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
