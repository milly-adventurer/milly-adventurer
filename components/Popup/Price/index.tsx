import Image from 'next/image';
import React from 'react';
import ButtonClose from '../../ButtonClose';
import wallet from '../../../assets/img/wallet.svg';

import styles from './Price.module.scss';
import Button, { Size, Type } from '../../Button';

interface Props {
  label: string;
  text: string;
  onClose(): void;
  onGoClick(): void;
}

const Price = ({
  label,
  text,
  onClose,
  onGoClick,
}: Props) => {
  return (
    <div className={`${styles.popupContent} popupContent`}>
      <div className={styles.text}>
        <h4 className={styles.title}>{label}</h4>
        <p className={styles.desc} dangerouslySetInnerHTML={{ __html: text }} />
        <div className={styles.price}>
          <svg width="25" height="22" viewBox="0 0 32 29" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.828 8.76062H19.4696C19.4696 8.76062 19.4752 11.2306 19.4696 14.2729C19.4654 17.322 19.4696 19.8016 19.4696 19.8016H31.8337V20.286C31.8337 25.6048 31.8337 28.75 31.8337 28.75H0.167342C0.167342 28.75 0.166992 25.6048 0.166992 20.286V8.70161C0.166992 3.38282 0.167112 0.25 0.167112 0.25L31.828 0.25C31.828 0.25 31.828 3.38282 31.828 8.70161V8.76062ZM7.67129 8.74827H16.6013H16.6069H16.6182C17.2867 8.74552 17.8271 8.21447 17.8243 7.56128C17.8215 6.90947 17.2754 6.38253 16.6069 6.38527H7.67129C7.00699 6.38802 6.46795 6.91359 6.46514 7.56265C6.46232 8.21447 7.00277 8.74552 7.67129 8.74827Z" fill="black" fill-opacity="0.78"/>
            <path opacity="0.4" d="M22.2725 17.5076H31.8344C31.8344 17.5076 31.8344 16.9881 31.8344 16.346V12.3377C31.833 11.697 31.8344 11.1748 31.8344 11.1748H22.2725L22.2725 17.5076Z" fill="#CACACA"/>
            <path d="M27.0837 14.3416C27.0837 15.2161 26.3748 15.925 25.5003 15.925C24.6259 15.925 23.917 15.2161 23.917 14.3416C23.917 13.4672 24.6259 12.7583 25.5003 12.7583C26.3748 12.7583 27.0837 13.4672 27.0837 14.3416Z" fill="black" fill-opacity="0.78"/>
          </svg>
          <p className={styles.sum}>35000 рублей</p>
        </div>
        <Button className={styles.goFurther} onClick={onGoClick} size={Size.MEDIUM} type={Type.FILLED} label="Отправиться в путешествие" />
        <ButtonClose className={styles.buttonClose} onClick={onClose} />
      </div>
    </div>
  );
};

export default Price;
