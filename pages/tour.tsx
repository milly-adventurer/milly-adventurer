import Head from 'next/head';
import Hero from '../sections/Hero';
import mountainImg from '../assets/img/mountain.jpg';
import React from 'react';
import Button, { Size, Type } from '../components/Button';
import styles from '../styles/Tour.module.scss';
import getClassNames from '../helpers/classNames';
import SectionContainer from '../components/SectionContainer';
import { useContext } from 'react';
import { WindowWidthContext } from '../contexts/WindowWidth';
import Slider from 'react-slick';
import Link from 'next/link';

const cn = getClassNames(styles);

const sections = [
  ['Обо мне', ''],
  ['Мои туры', ''],
  ['Отзывы клиентов', ''],
  ['Фотографии', ''],
  ['Ответы на вопросы', ''],
];

const Tour = () => {
  const { isMobile } = useContext(WindowWidthContext);

  return (
    <>
      <Head>
        <title>Milly adventurer - туры в России</title>
        <meta name="description" content="Туры и экспедиции по России" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero backgroundImage={mountainImg.src} navBarItems={sections}>
        <div>
          <small className={cn('date')}>23-27 июня</small>
          <h3 className={cn('title')}>Горный Алтай</h3>
          <p className={cn('desc')}>Глубокие эмоции и истинный восторг
            в увлекательном летнем путешествии по самым невероятным и впечатляющим пейзажам и сакральным местам силы Алтая.</p>
          <Button className={styles.cellButton} label="Отправиться в путешествие" onClick={() => {}} type={Type.FILLED} size={Size.LARGE} />
        </div>
      </Hero>
      {/* <section className={cn('sliderSection')}>
        <SectionContainer paddings={!!isMobile}>
          <h2 className={cn('sliderSectionTitle')}>Куда же мы отправимся?</h2>
          <Slider speed={0} waitForAnimate={false} centerMode centerPadding={isMobile ? '10px' : '60px'} arrows={false} slidesToShow={1} infinite>
            {Array(3).fill('null').map((_, i) => (
              <article className={cn('slide')}>
                <div className={cn('slideContainer')} style={{
                  background: `url(${mountainImg.src})`
                }}>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>{i} день - прибытие</p>
                  <p className={cn('slideDescription')}>Мы посетим старейшую гору Алтая - Адыр Кайя, с которой совершим полет на парапланах и увидим множество мелких деревушек над нами. А пока вы будете наслаждаться полетом, вас будет снимать наш профессиональный фотограф.</p>
                  <Link href="#">
                    <a>
                      <Button label="Узнать больше" onClick={() => {}} size={Size.MEDIUM} type={Type.OUTLINE} />
                    </a>
                  </Link>
                </div>
                </div>
              </article>
            ))}
          </Slider>
        </SectionContainer>
      </section> */}
      <p style={{ color: 'black', padding: '20px' }}>developing...</p>
    </>
  );
};

export default Tour;
