import React from 'react';
import ButtonClose from '../../ButtonClose';

import styles from './Book.module.scss';
import BookSection from '../../../sections/Book';

interface Props {
  onClose(): void;
}

const Book = ({
  onClose,
}: Props) => {
  return (
    <div className={`popupContent`}>
      <BookSection noBg/>
      <ButtonClose className={styles.buttonClose} onClick={onClose} />
    </div>
  );
};

export default Book;
