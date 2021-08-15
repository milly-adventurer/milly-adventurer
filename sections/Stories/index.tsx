import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from '../../components/SectionContainer';
import styles from './Stories.module.scss';
import arrow from '../../assets/img/arrow.svg';

import commentImage from '../../assets/img/comment.jpg';
import { PropsWithChildren, useContext } from 'react';
import Slider, { Settings } from 'react-slick';
import { WindowWidthContext } from '../../contexts/WindowWidth';

const Comment = ({ isMobile }: { isMobile: boolean }) => <article className={styles.card}>
  <strong className={styles.name}>Ирина Ивановна</strong>
  <p className={styles.comment}>Этот тур стал для меня настоящим открытием и приключением. Этот тур стал для меня настоящим открытием и приключением Этот тур стал для меня настоящим открытием и приключением</p>
</article>;

const DivOrSlider = ({
  isSlider,
  children,
  options,
  className,
}: PropsWithChildren<{
  isSlider: boolean;
  options?: Settings
  className?: string;
}>) => {
  return isSlider ?
    <Slider className={className} dots {...options}>
      {children}
    </Slider> :
    <div className={className}>
      {children}
    </div>;
};

const Stories = () => {
  const { isMobile } = useContext(WindowWidthContext);

  return isMobile === null ? <></> : (
    <section className={styles.section}>
      <SectionContainer>
        <h2 className={styles.title}>Истории клиентов</h2>
        <DivOrSlider options={{ speed: 0, waitForAnimate: false, infinite: true, slidesPerRow: 1, arrows: false, centerMode: true, centerPadding: '0px' }} isSlider={!!isMobile} className={styles.content}>
          {Array(4).fill(null).map((_, i) => <Comment isMobile={!!isMobile} key={i}/>)}
        </DivOrSlider>
      </SectionContainer>
    </section>
  );
};

export default Stories;
