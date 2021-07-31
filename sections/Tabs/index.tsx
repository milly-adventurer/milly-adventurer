import Image from 'next/image';
import { Fragment, useContext, useState } from 'react';
import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import styles from './Tabs.module.scss';
import arrow from '../../assets/img/arrow.svg';

import someImage from '../../assets/img/last.jpg';
import altaiImage from '../../assets/img/altai.jpg';
import baikalImage from '../../assets/img/baikal.jpg';
import crimImage from '../../assets/img/crim.jpg';

import { WindowWidthContext } from '../../contexts/WindowWidth';

const places: [string, StaticImageData][] = [
  ['Дагестан', someImage],
  ['Алтай', altaiImage],
  ['Крым', baikalImage],
  ['Байкал', crimImage],
];

const Tabs = () => {
  const [activeButton, setActiveButton] = useState(0);
  const { isMobile } = useContext(WindowWidthContext);

  return (
    <section className={styles.section}>
      <SectionContainer paddings={!!isMobile}>
        <h2 className={styles.title}>Как это было в прошлый раз</h2>
        <div className={styles.buttonsContainer}>
          {places.map(([name], i) => (
            <Button key={i} size={Size.SMALL} type={Type.FILLED} className={`${activeButton !== i ? styles.unactiveButton : ''} ${styles.button}`} label={name} onClick={() => setActiveButton(i)}/>
          ))}
        </div>
        {places.filter((_, i) => i === activeButton).map(([name, img], i) => (
          <Fragment key={i}>
                    <p className={styles.description}>Дагестан один из уникальнейших регионов России, богатейший по своей многовековой истории и поражающий удивительным разнообразием природы.</p>
        <div className={styles.imgs}>
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className={styles.img} style={{
                background: `url(${img.src}) center center`
              }}/>
            ))}
          </div>
          <div className={styles.showMoreWrapper}>
            <button className={styles.showMore}>
              Больше фотографий
              <div style={{
                marginLeft: '10px',
                display: 'flex',
            }}>
              <Image src={arrow} width={isMobile ? undefined : 30} height={isMobile ? undefined : 20} />
          </div>
            </button>
          </div>
          </Fragment>
        ))}
      </SectionContainer>
    </section>
  );
};

export default Tabs;
