import Head from 'next/head';
import Image from 'next/image';

import Hero from '../sections/Hero';

import homeBg from '../assets/img/home-bg.jpg';
import logo from '../assets/img/logo.png';
import cellBg from '../assets/img/cell-del.jpg';
import cell2Bg from '../assets/img/cell-2-del.jpg';
import cell3Bg from '../assets/img/cell-3-del.jpg';
import millyBg from '../assets/img/milly.jpg';

import styles from '../styles/Home.module.scss';
import Button, { Size, Type } from '../components/Button';
import Grid, { Content } from '../sections/Grid';
import getClassNames from '../helpers/classNames';
import { useContext, useMemo } from 'react';
import Me from '../sections/Me';
import SectionContainer from '../components/SectionContainer';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import Stories from '../sections/Stories';
import Tabs from '../sections/Tabs';
import Questions from '../sections/Questions';
import { WindowWidthContext } from '../contexts/WindowWidth';

const cn = getClassNames(styles);

const sections = ['Мои туры', 'Обо мне', 'Отзывы клиентов', 'Фотографии', 'Ответы на вопросы'];

const bgs = [cellBg, cell2Bg, cell3Bg, cell2Bg];

const Home = () => {
  const { isMobile } = useContext(WindowWidthContext);

  const content = useMemo<Content>(() => Array(4).fill(null).map((_, i) => ({
    child: (
      <>
        <small className={cn('cellDate')}>21 апреля 2020 года</small>
        <h3 className={cn('cellTitle')}>Золотая осень в горном алтае</h3>
        <p className={cn('cellDescription')}>Для любителей гор и желтеющих деревьев</p>
        <Button className={styles.cellButton} label="Узнать больше" onClick={() => {}} type={Type.OUTLINE} size={Size.LARGE} />
      </>
    ),
    backgroundImage: bgs[i].src,
    className: styles.cellContainer,

  })), []);

  const onSeeToursClick = () => {

  };

  return (
    <>
      <Head>
        <title>Milly adventurer - туры в России</title>
        <meta name="description" content="Туры и экспедиции по России" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero backgroundImage={homeBg.src} navBarItems={sections}>
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" />
        </div>
        <h1 className={styles.title}>Душевные авторские туры и экспедиции по России</h1>
        <Button onClick={onSeeToursClick} label="Посмотреть туры" size={Size.LARGE} />
      </Hero>
      <Grid title="Мои авторские туры" content={content} />
      <Me />
      <section className={cn('slideSection')}>
        <SectionContainer paddings={!!isMobile}>
          <h2 className={cn('slideSectionTitle')}>Мои душевные авторские путешествия это</h2>
          <div className={cn('content')}>
            <Slider arrows={false} centerMode centerPadding={isMobile ? '20px' : '90px'} slidesToShow={1} infinite>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${millyBg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>Эксклюзивные и лично проверенные маршруты</p>
                  <p className={cn('slideDescription')}>Профессиональный тревел эксперт и организатор авторских туров с многолетним опытом работы в туризме.</p>
                </div>
              </article>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${homeBg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>lorem ipsum тефыло ывоафдыоа щ</p>
                  <p className={cn('slideDescription')}>Профессионафоывлао лыаофлдыоафы ылаофлдаоыв лфоыа длфыова доываоыоа фыоало с многолетним опытом работы в туризме.</p>
                </div>
              </article>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${cell2Bg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>немного олфыоа цк 283 фы валдфоыдва</p>
                  <p className={cn('slideDescription')}>ываоыл олдыоафлдыо оало с многолетним опытом работы в туризме.</p>
                </div>
              </article>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${cell2Bg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>немного олфыоа цк 283 фы валдфоыдва</p>
                  <p className={cn('slideDescription')}>ываоыл олдыоафлдыо оало с многолетним опытом работы в туризме.</p>
                </div>
              </article>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${cell2Bg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>немного олфыоа цк 283 фы валдфоыдва</p>
                  <p className={cn('slideDescription')}>ываоыл олдыоафлдыо оало с многолетним опытом работы в туризме.</p>
                </div>
              </article>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${cell2Bg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>немного олфыоа цк 283 фы валдфоыдва</p>
                  <p className={cn('slideDescription')}>ываоыл олдыоафлдыо оало с многолетним опытом работы в туризме.</p>
                </div>
              </article>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${cell2Bg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>немного олфыоа цк 283 фы валдфоыдва</p>
                  <p className={cn('slideDescription')}>ываоыл олдыоафлдыо оало с многолетним опытом работы в туризме.</p>
                </div>
              </article>
              <article className={cn('slide')}>
                <div style={{
                background: `url(${cell2Bg.src})`,
              }} className={cn('slideImg')}>

                </div>
                <div className={cn('slideTextContainer')}>
                  <p className={cn('slideTitle')}>немного олфыоа цк 283 фы валдфоыдва</p>
                  <p className={cn('slideDescription')}>ываоыл олдыоафлдыо оало с многолетним опытом работы в туризме.</p>
                </div>
              </article>
            </Slider>
          </div>
        </SectionContainer>
      </section>
      <Stories />
      <Tabs />
      <Questions />
    </>
  );
};

export default Home;
