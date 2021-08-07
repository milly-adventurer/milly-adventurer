import Image from 'next/image';
import React from 'react';
import ButtonClose from '../../ButtonClose';

import milly from '../../../assets/img/milly-incl.jpg';

import styles from './WhatIncluded.module.scss';

interface Props {
  label: string;
  text: string;
  onClose(): void;
}

const WhatIncluded = ({
  label,
  text,
  onClose,
}: Props) => {
  return (
    <div className={`${styles.popupContent} popupContent`}>
      <div className={styles.text}>
        <h4 className={styles.title}>{label}</h4>
        <p className={styles.desc} dangerouslySetInnerHTML={{ __html: text }} />
        <ButtonClose className={styles.buttonClose} onClick={onClose} />
      </div>
    </div>
  );
};

export default WhatIncluded;
