import Head from 'next/head';
import Image from 'next/image';

import Hero from '../sections/Hero';

import homeBg from '../assets/img/home-bg.jpg';
import casctleBg from '../assets/img/castle.jpg';

import styles from '../styles/Program.module.scss';
import Button, { Size, Type } from '../components/Button';
import Grid, { Content } from '../sections/Grid';
import getClassNames from '../helpers/classNames';
import { ReactChild, ReactNode, useMemo, useState } from 'react';
import SectionContainer from '../components/SectionContainer';

import baikalImg from '../assets/img/baikal.jpg';
import Book from '../sections/Book';
import Questions from '../sections/Questions';
import Footer from '../sections/Footer';
import Popup from '../components/Popup';
import WhatIncluded from '../components/Popup/WhatIncluded';
import Price from '../components/Popup/Price';
import BookPopup from '../components/Popup/Book';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

const cn = getClassNames(styles);

const sections: [ReactNode, string][] = [
  [<Link href="/">Главная</Link>, ''],
  ['Программа', 'program'],
  ['Дополнительная инормация', 'info'],
  ['Забронировать', 'book'],
];

const Program = () => {
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    content: ReactChild | null;
  }>({
    isOpen: false,
    content: null,
  });

  const popups = useMemo(() => [
    {
      q: 'Что включено?',
      c: (
        <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label="Что включено?" text={`
        ♡ Встреча в аэропорту
        </br>
        </br>
        ♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
        </br>
        </br>
        ♡ Проживание в гостевых домах и на турбазах по программе
        </br>
        </br>
        ♡ Завтраки, обеды и ужины
        </br>
        </br>
        ♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
        </br>
        </br>
        ♡ Сопровождение опытным гидом-водителем и организатором
        </br>
        </br>
        ♡ Входные билеты
        </br>
        </br>
        ♡ Паромная переправа
        </br>
        </br>
        ♡ Заброски на труднодоступные локации на внедорожниках
        </br>
        </br>
        ♡ Трансфер в аэропорт
        </br>
        </br>
        ♡ Страховка от укуса клеща
        </br>
        </br>
        ♡ Горячий чай, кофе, вода, перекус в дорогу.`}
        />
      ),
    },
    {
      q: 'Какие расходы?',
      c: (
        <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label="Какие расходы?" text={`
        ♡ Встреча в аэропорту
        </br>
        </br>
        ♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
        </br>
        </br>
        ♡ Проживание в гостевых домах и на турбазах по программе
        </br>
        </br>
        ♡ Завтраки, обеды и ужины
        </br>
        </br>
        ♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
        </br>
        </br>
        ♡ Сопровождение опытным гидом-водителем и организатором
        </br>
        </br>
        ♡ Входные билеты
        </br>
        </br>
        ♡ Паромная переправа
        </br>
        </br>
        ♡ Заброски на труднодоступные локации на внедорожниках
        </br>
        </br>
        ♡ Трансфер в аэропорт
        </br>
        </br>
        ♡ Страховка от укуса клеща
        </br>
        </br>
        ♡ Горячий чай, кофе, вода, перекус в дорогу.`}
        />
      )
    },
    {
      q: 'Частые вопросы',
      c: (
        <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label="Частые вопросы" text={`
          ♡ Встреча в аэропорту
          </br>
          </br>
          ♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
          </br>
          </br>
          ♡ Проживание в гостевых домах и на турбазах по программе
          </br>
          </br>
          ♡ Завтраки, обеды и ужины
          </br>
          </br>
          ♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
          </br>
          </br>
          ♡ Сопровождение опытным гидом-водителем и организатором
          </br>
          </br>
          ♡ Входные билеты
          </br>
          </br>
          ♡ Паромная переправа
          </br>
          </br>
          ♡ Заброски на труднодоступные локации на внедорожниках
          </br>
          </br>
          ♡ Трансфер в аэропорт
          </br>
          </br>
          ♡ Страховка от укуса клеща
          </br>
          </br>
          ♡ Горячий чай, кофе, вода, перекус в дорогу.`}
        />
      )
    },
    {
      q: 'Какова цена?',
      c: (
        <Price onGoClick={() => setPopup({ isOpen: true, content: <BookPopup onClose={() => setPopup({ ...popup, isOpen: false })}/> })}  onClose={() => setPopup({ ...popup, isOpen: false })} label="Какова цена?" text={`
          Я предлагаю вам незабываемое путешествие, в котором вы  сможете отдонхнуть и т.д. Вообщем надо описать так чтобы еще раз напомнить человеку что за такое не жалко отдать денег.`}
        />
      )
    }
  ], [popup]);

  const gridContent: Content = useMemo(() => popups.map((o, i) => ({
    darken: true,
    child: (
      <div className={cn('cell')}>
        <strong className={cn('cellTitle')}>
          {o.q}
        </strong>
        <Button label="Подробнее" onClick={() => { setPopup(prev => ({ content: o.c, isOpen: !prev.isOpen })) }} type={Type.OUTLINE} size={Size.LARGE} />
      </div>
    ),
    className: cn('cellWrapper'),
    backgroundImage: baikalImg.src,
  })), []);

  return (
    <>
      <Popup onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))} open={popup.isOpen}>
        {popup.content}
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
          <ScrollLink to="program" spy smooth color="white">
            <Button className={styles.cellButton} label="Отправиться в путешествие" onClick={() => { }} type={Type.FILLED} size={Size.LARGE} />
          </ScrollLink>
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
