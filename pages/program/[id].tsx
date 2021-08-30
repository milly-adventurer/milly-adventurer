import Head from 'next/head';

import Hero from '../../sections/Hero';

import homeBg from '../../assets/img/home-bg.jpg';
import casctleBg from '../../assets/img/castle.jpg';

import styles from '../../styles/Program.module.scss';
import Button, { Size, Type } from '../../components/Button';
import Grid, { Content } from '../../sections/Grid';
import getClassNames from '../../helpers/classNames';
import { ReactChild, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import SectionContainer from '../../components/SectionContainer';

import baikalImg from '../../assets/img/baikal.jpg';
import Book from '../../sections/Book';
import Questions from '../../sections/Questions';
import Footer from '../../sections/Footer';
import Popup from '../../components/Popup';
import WhatIncluded from '../../components/Popup/WhatIncluded';
import Price from '../../components/Popup/Price';
import BookPopup from '../../components/Popup/Book';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { DataContext } from '../../contexts/Data';
import { useRouter } from 'next/dist/client/router';

const cn = getClassNames(styles);

const sections: [ReactNode, string][] = [
  [<Link href="/">Главная</Link>, ''],
  ['Программа', 'program'],
  ['Дополнительная инормация', 'info'],
  ['Забронировать', 'book'],
];

const Program = () => {
  const router = useRouter();
  const { getTourById, data } = useContext(DataContext);
  const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, data]);

  if (!tour) return <></>;

  useEffect(() => {
    if (!tour) {
      router.push('/');
    }
  }, [tour]);

  const [popup, setPopup] = useState<{
    isOpen: boolean;
    content: ReactChild | null;
  }>({
    isOpen: false,
    content: null,
  });

  const popups = useMemo(() => {
    const info = tour.info || {};

    return [
      info[0] && {
        question: info[0].question,
        content: (
          <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label={info[0].question} text={info[0].content}
          />
        ),
      },
      info[1] && {
        question: info[1].question,
        content: (
          <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label={info[1].question} text={info[1].content}
          />
        ),
      },
      info[2] && {
        question: info[2].question,
        content: (
          <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label={info[2].question} text={info[2].content}
          />
        ),
      },
      info[3] && {
        question: info[3].question,
        content: (
          <Price price={tour.price} onGoClick={() => setPopup({ isOpen: true, content: <BookPopup codeWord={tour.code_word} onClose={() => setPopup({ ...popup, isOpen: false })} /> })} onClose={() => setPopup({ ...popup, isOpen: false })} label={info[3].question} text={info[3].content}
          />
        )
      }
    ]
  }, [popup]);

  const gridContent: Content = useMemo(() => popups.map((item, i) => item ? ({
    darken: true,
    child: (
      <div className={cn('cell')}>
        <strong className={cn('cellTitle')}>
          {item.question}
        </strong>
        <Button label="Подробнее" onClick={() => { setPopup(prev => ({ content: item.content, isOpen: !prev.isOpen })) }} type={Type.OUTLINE} size={Size.LARGE} />
      </div>
    ),
    className: cn('cellWrapper'),
    backgroundImage: baikalImg.src,
  }) : {}), []);

  return tour ? (
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
          <small className={cn('date')}>{tour.date}</small>
          <h3 className={cn('title')}>{tour.name}</h3>
          <p className={cn('desc')}>{tour.description}</p>
          <ScrollLink to="program" spy smooth color="white">
            <Button className={styles.cellButton} label="Отправиться в путешествие" onClick={() => { }} type={Type.FILLED} size={Size.LARGE} />
          </ScrollLink>
        </div>
      </Hero>
      <div id="program">
        <section>
          <SectionContainer paddings={true}>
            <h2 className={cn('programTitle')}>Программа тура</h2>
            {tour.program.map(({ name, description, picture }, i) => (
              <article key={i} className={cn('day')}>
                <div className={cn('text')}>
                  <SectionContainer>
                    <h3 className={cn('dayTitle')}>День {i} - {name}</h3>
                    <p className={cn('dayDesc')}>{description}</p>
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
        <Book codeWord={tour.code_word} />
      </div>
      <div style={{
        marginBottom: 30,
      }} />
      <Questions />
      <Footer />
    </>
  ) : null;
};

export default Program;
