import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from '../../components/SectionContainer';
import styles from './Stories.module.scss';

import commentImage from '../../assets/img/comment.jpg';
import { PropsWithChildren, useContext } from 'react';
import Slider, { Settings } from 'react-slick';
import { WindowWidthContext } from '../../contexts/WindowWidth';

const Comment = () => <article className={styles.card}>
  <div className={styles.imgContainer}>
    <Image src={commentImage} className={styles.img} />
  </div>
  <strong className={styles.name}>Ирина Ивановна</strong>
  <p className={styles.comment}>Этот тур стал для меня настоящим открытием и приключением</p>
  <Link href="/">
    <a className={styles.link}>
      Прочитать
    </a>
  </Link>
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
    <Slider className={className} {...options}>
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
        <DivOrSlider options={{ infinite: true, slidesPerRow: 1, arrows: false, centerMode: true, centerPadding: '0px' }} isSlider={!!isMobile} className={styles.content}>
          {Array(4).fill(null).map(() => <Comment />)}
        </DivOrSlider>
      </SectionContainer>
    </section>
  );
};

export default Stories;