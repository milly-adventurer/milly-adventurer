import Image from 'next/image';
import { useContext, useState } from 'react';
import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import styles from './Tabs.module.scss';

import someImage from '../../assets/img/last.jpg';
import { WindowWidthContext } from '../../contexts/WindowWidth';

const Tabs = () => {
  const [activeButton, setActiveButton] = useState(0);
  const { isMobile } = useContext(WindowWidthContext);

  return (
    <section className={styles.section}>
      <SectionContainer paddings={!!isMobile}>
        <h2 className={styles.title}>Как это было в прошлый раз</h2>
        <div className={styles.buttonsContainer}>
          {['Дагестан', 'Алтай', 'Крым', 'Байкал'].map((item, i) => (
            <Button key={i} size={Size.SMALL} type={Type.FILLED} className={`${activeButton !== i ? styles.unactiveButton : ''} ${styles.button}`} label={item} onClick={() => setActiveButton(i)}/>
          ))}
        </div>
        <p className={styles.description}>Дагестан один из уникальнейших регионов России, богатейший по своей многовековой истории и поражающий удивительным разнообразием природы.</p>
        <div className={styles.imgs}>
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className={styles.img} style={{
              background: `url(${someImage.src}) center center`
            }}/>
          ))}
        </div>
        <div className={styles.showMoreWrapper}>
          <button className={styles.showMore}>
            Больше фотографий
          </button>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Tabs;
