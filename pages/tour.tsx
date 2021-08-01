import Head from 'next/head';
import Hero from '../sections/Hero';
import mountainImg from '../assets/img/mountain.jpg';
import React, { useState } from 'react';
import Button, { Size, Type } from '../components/Button';
import styles from '../styles/Tour.module.scss';
import getClassNames from '../helpers/classNames';
import SectionContainer from '../components/SectionContainer';
import { useContext } from 'react';
import { WindowWidthContext } from '../contexts/WindowWidth';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import Me from '../sections/Me';
import Stories from '../sections/Stories';
import Grid, { Content } from '../sections/Grid';

import ArrowDown from '../assets/img/arrowDown.svg';

import altaiImage from '../assets/img/altai.jpg';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import Book from '../sections/Book';
import Questions from '../sections/Questions';

const cn = getClassNames(styles);

const sections = [
  ['Обо мне', ''],
  ['Мои туры', ''],
  ['Отзывы клиентов', ''],
  ['Фотографии', ''],
  ['Ответы на вопросы', ''],
];

const gridContent: Content = Array(4).fill(null).map((_, i) => ({
  backgroundImage: altaiImage.src,
  child: i === 3 ? (
    <div className={styles.gridItem}>
      <p>+50 фотографий</p>
      <Button label="Открыть" onClick={() => {}} size={Size.MEDIUM} type={Type.OUTLINE} />
    </div>
  ) : undefined,
  className: styles.gridItem,
  darken: i === 3,
}));

const qa = [
  ['Что входит в тур помимо программы?', `Встреча в аэропорту
  <br/><br/>♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
  <br/><br/>♡ Проживание в гостевых домах и на турбазах по программе
  <br/><br/>♡ Завтраки, обеды и ужины
  <br/><br/>♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
  `],
  ['Что входит в тур помимо программы?', `Встреча в аэропорту
  <br/><br/>♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
  <br/><br/>♡ Проживание в гостевых домах и на турбазах по программе
  <br/><br/>♡ Завтраки, обеды и ужины
  <br/><br/>♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
  `],
  ['Что входит в тур помимо программы?', `Встреча в аэропорту
  <br/><br/>♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
  <br/><br/>♡ Проживание в гостевых домах и на турбазах по программе
  <br/><br/>♡ Завтраки, обеды и ужины
  <br/><br/>♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
  `]
]

const Tour = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

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
      <section className={cn('sliderSection')}>
        <SectionContainer paddings={true}>
          <h2 className={cn('sliderSectionTitle')}>Куда же мы отправимся?</h2>
          <Slider speed={0} waitForAnimate={false} centerMode centerPadding={isMobile ? '10px' : '100px'} arrows={false} slidesToShow={1} infinite>
            {Array(3).fill('null').map((_, i) => (
              <article key={i} className={cn('slide')}>
                <div className={cn('slideContainer')} style={{
                  background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${mountainImg.src}) center center`
                }}>
                <div className={cn('slideTextContainer')}>
                  <h3 className={cn('slideTitle')}>{i + 1} день - прибытие</h3>
                  <p className={cn('slideDescription')}>Мы посетим старейшую гору Алтая - Адыр Кайя, с которой совершим полет на парапланах и увидим множество мелких деревушек над нами. А пока вы будете наслаждаться полетом, вас будет снимать наш профессиональный фотограф.</p>
                  <Link href="#">
                    <a>
                      <Button className={styles.slideButton} label="Узнать больше" onClick={() => {}} size={Size.MEDIUM} type={Type.OUTLINE} />
                    </a>
                  </Link>
                </div>
                </div>
              </article>
            ))}
          </Slider>
        </SectionContainer>
      </section>
      <Me />
      <Stories />
      <Grid content={gridContent} title="Как это было в прошлый раз" />
      <section>
        <SectionContainer>
          <h2 className={styles.accordionSectionTitle}>Ответы на ваши вопросы</h2>
          <div>
            <Accordion preExpanded={['0']} onChange={(indexes: string[]) => {
              setOpenedIds(indexes);
            }} className={styles.accordion} allowZeroExpanded allowMultipleExpanded={false}>
              {qa.map(([q, a], i) => (
                <AccordionItem key={i} uuid={`${i}`} className={styles.accordionItem}>
                  <AccordionItemHeading className={styles.accordionHeader}>
                    <AccordionItemButton className={styles.accordionButton}>
                      {q}
                      <Image src={ArrowDown} width={15} className={openedIds.includes(`${i}`) ? styles.arrowUp : ''} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className={styles.accordionItemDesc} dangerouslySetInnerHTML={{__html: a}} />
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionContainer>
      </section>
      <Book />
      <div style={{
        marginBottom: 30,
      }}></div>
      <Questions />
    </>
  );
};

export default Tour;
