import Head from 'next/head';
import Image from 'next/image';

import Hero from '../sections/Hero';

import homeBg from '../assets/img/home-bg.jpg';
import casctleBg from '../assets/img/castle.jpg';

import styles from '../styles/Program.module.scss';
import Button, { Size, Type } from '../components/Button';
import Grid, { Content } from '../sections/Grid';
import getClassNames from '../helpers/classNames';
import { useContext, useMemo, useState } from 'react';
import SectionContainer from '../components/SectionContainer';

import { WindowWidthContext } from '../contexts/WindowWidth';

import baikalImg from '../assets/img/baikal.jpg';
import Book from '../sections/Book';
import Questions from '../sections/Questions';
import Footer from '../sections/Footer';
import Popup from 'reactjs-popup';

const cn = getClassNames(styles);

const sections = [
  ['Программа', 'program'],
  ['Дополнительная инормация', 'info'],
  ['Забронировать', 'book'],
];

const Program = () => {
  const [isOpen, setIsOpen] = useState(false);

  const gridContent: Content = useMemo(() => Array(4).fill(null).map(() => ({
    darken: true,
    child: (
      <div className={cn('cell')}>
        <strong className={cn('cellTitle')}>
          Что включено?
        </strong>
        <Button label="Подробнее" onClick={() => {setIsOpen(true)}} type={Type.OUTLINE} size={Size.LARGE} />
      </div>
    ),
    className: cn('cellWrapper'),
    backgroundImage: baikalImg.src,
  })), []);

  return (
    <>
      <Popup open={isOpen}>
        aksdjfklasjfkajsdfk
      </Popup>
      <Head>
        <title>Milly adventurer - туры в России</title>
        <meta name="description" content="Туры и экспедиции по России" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero backgroundImage={homeBg.src} navBarItems={sections} className={styles.hero}>
        <div className={cn('heroDiv')}>
          <small className={cn('date')}>23-27 июня</small>
          <h3 className={cn('title')}>Отправиться в путешествие</h3>
          <p className={cn('desc')}>Глубокие эмоции и истинный восторг
            в увлекательном летнем путешествии по самым невероятным и впечатляющим пейзажам и сакральным местам силы Алтая.</p>
          <Button className={styles.cellButton} label="Отправиться в путешествие" onClick={() => {}} type={Type.FILLED} size={Size.LARGE} />
        </div>
      </Hero>
      <div id="program">
        <section>
          <SectionContainer paddings={true}>
            <h2 className={cn('programTitle')}>Программа тура на Байкал</h2>
            {Array(6).fill(null).map((_, i) => (
              <article key={i} className={cn('day')}>
                <div className={cn('text')}>
                  <SectionContainer>
                    <h3 className={cn('dayTitle')}>День {i} - прибытие на Байкал</h3>
                    <p className={cn('dayDesc')}>◇ Утром я встречаю вас в аэропорту Горно-Алтайска
                      <br />
                      ◇ Знакомимся и едем путешествовать по Чемальскому району
                      Сегодня мы увидим много интересного:
                      <br />
                      - Зубы Дракона
                      <br />
                      - Остров Патмос
                      <br />
                      - Ворота Сартакпая
                      <br />
                      - Ороктойский мост
                      <br />
                      - Долину горных Духов и урочище Че-Чкыш
                      <br />
                      ◇ Будем провожать закат на смотровой площадке с потрясающим видом на Катунь
                      <br />
                      ◇ Ночь проведем на уютной турбазе в посёлке Чемал.
                    </p>
                  </SectionContainer>
                </div>
                <div style={{
                  background: `url(${casctleBg.src})`,
                }} className={cn('dayImg')} />
              </article>
            ))}
          </SectionContainer>
        </section>
      </div>
      <div id="info">
        <Grid title="Дополнительная информация" content={gridContent} />
      </div>
      <div id="book">
        <Book />
      </div>
      <div style={{
        marginBottom: 30,
      }} />
      <Questions />
      <Footer />
    </>
  );
};

export default Program;
