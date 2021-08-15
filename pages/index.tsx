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
import React, { ReactNode, useContext, useMemo } from 'react';
import Me from '../sections/Me';
import SectionContainer from '../components/SectionContainer';

import Slider from 'react-slick';
import Stories from '../sections/Stories';
import Tabs from '../sections/Tabs';
import Questions from '../sections/Questions';
import { WindowWidthContext } from '../contexts/WindowWidth';
import NextLink from 'next/link';
import Footer from '../sections/Footer';
import { Link } from 'react-scroll';

const cn = getClassNames(styles);

const sections: [ReactNode, string][] = [
  ['Мои туры', 'tours'],
  ['Обо мне', 'about'],
  ['Отзывы клиентов', 'reviews'],
  ['Фотографии', 'photos'],
  ['Ответы на вопросы', 'qa'],
];

const bgs = [cellBg, cell2Bg, cell3Bg, cell2Bg];

const Home = () => {
  const { isMobile } = useContext(WindowWidthContext);

  const toursContent = useMemo<Content>(() => Array(4).fill(null).map((_, i) => ({
    child: (
      <>
        <small className={cn('cellDate')}>21 апреля 2020 года</small>
        <h3 className={cn('cellTitle')}>Золотая осень в горном алтае</h3>
        <p className={cn('cellDescription')}>Для любителей гор и желтеющих деревьев</p>
        <NextLink href='/tour'>
          <a>
            <Button className={styles.cellButton} label="Узнать больше" onClick={() => {}} type={Type.OUTLINE} size={Size.LARGE} />
          </a>
        </NextLink>
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
        <Link to="tours" spy smooth color="white">
          <Button onClick={onSeeToursClick} label="Посмотреть туры" size={Size.LARGE} />
        </Link>
      </Hero>
      <div id="tours">
        <Grid title="Мои авторские туры" content={toursContent} />
      </div>
      <div id="about">
        <Me />
      </div>
      <section className={cn('slideSection')}>
        <SectionContainer paddings={true}>
          <h2 className={cn('slideSectionTitle')}>Мои душевные авторские путешествия это</h2>
          <div className={cn('content')}>
            <Slider speed={0} waitForAnimate={false} arrows={false} centerMode centerPadding={isMobile ? '20px' : '90px'} slidesToShow={1} infinite>
              {Array(3).fill(null).map((_, i) => (
                <article key={i} className={cn('slide')}>
                  <div style={{
                    background: `url(${millyBg.src})`,
                  }} className={cn('slideImg')}>
                  </div>
                  <div className={cn('slideTextContainer')}>
                    <p className={cn('slideTitle')}>Эксклюзивные и лично проверенные маршруты</p>
                    <p className={cn('slideDescription')}>Профессиональный тревел эксперт и организатор авторских туров с многолетним опытом работы в туризме.</p>
                  </div>
                </article>
              ))}  
            </Slider>
          </div>
        </SectionContainer>
      </section>
      <div id="reviews">
        <Stories />
      </div>
      <div id="photos">
        <Tabs />
      </div>
      <div id="qa">
        <Questions />
      </div>
      <Footer />
    </>
  );
};

export default Home;
