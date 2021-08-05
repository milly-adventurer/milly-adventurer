import Image from 'next/image';
import React from 'react';
import getClassNames from '../../../helpers/classNames';
import ButtonClose from '../../ButtonClose';

import styles from './Gallery.module.scss';

const cn = getClassNames(styles);

interface Props {
  label: string;
  imgs: string[];
  onClose(): void;
}

const Gallery = ({
  label,
  imgs,
  onClose,
}: Props) => {
  return (
    <div className={`${styles.popupContent} popupContent`}>
      <div className={styles.content}>
        <h4 className={styles.title}>{label}</h4>
        <ButtonClose className={styles.buttonClose} onClick={onClose} />
        <div className={styles.imgsBlock}>
          {imgs.map((item) => (
            <div className={styles.img} style={{
              background: `url(${item})`,
              backgroundSize: 'cover',
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
