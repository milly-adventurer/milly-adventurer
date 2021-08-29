import Head from 'next/head';
import Hero from '../../sections/Hero';
import mountainImg from '../../assets/img/mountain.jpg';
import React, { ReactChild, useEffect, useMemo, useState } from 'react';
import Button, { Size, Type } from '../../components/Button';
import styles from '../../styles/Tour.module.scss';
import getClassNames from '../../helpers/classNames';
import SectionContainer from '../../components/SectionContainer';
import { useContext } from 'react';
import { WindowWidthContext } from '../../contexts/WindowWidth';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import Me from '../../sections/Me';
import Stories from '../../sections/Stories';
import Grid, { Content } from '../../sections/Grid';

import ArrowDown from '../../assets/img/arrowDown.svg';

import altaiImage from '../../assets/img/altai.jpg';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import Book from '../../sections/Book';
import Questions from '../../sections/Questions';
import Footer from '../../sections/Footer';
import Popup from '../../components/Popup';
import Gallery from '../../components/Popup/Gallery';
import { NavBarItems } from '../../components/NavBar';
import { Link as ScrollLink } from 'react-scroll';
import { DataContext } from '../../contexts/Data';
import { useRouter } from 'next/dist/client/router';

import EditableText from '../../components/EditableText';
import EditContext from '../../contexts/Edit';
import UserInfoContext from '../../contexts/UserInfo';
import UploadImage from '../../components/UploadImage';

const cn = getClassNames(styles);

const sections: NavBarItems = [
  [<Link href="/">Главная</Link>, ''],
  ['Программа', 'tour_program'],
  ['Обо мне', 'tour_me'],
  ['Фотографии', 'tour_photo'],
  ['Ответы на вопросы', 'tour_qa'],
];

const Tour = () => {
  const router = useRouter();
  const { isMobile } = useContext(WindowWidthContext);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const { getTourById, editDay, addDay } = useContext(DataContext);
  const { canEdit } = useContext(UserInfoContext);
  const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query]);

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
    content: <Gallery onClose={() => setPopup({ ...popup, isOpen: false })} label="Алтай фотографии" imgs={Array(10).fill(mountainImg.src)} />,
  });

  const gridContent: Content = useMemo(() => Array(4).fill(null).map((_, i) => ({
    backgroundImage: altaiImage.src,
    child: i === 3 ? (
      <div className={styles.gridItem}>
        <p>+50 фотографий</p>
        <Button label="Открыть" onClick={() => setPopup(prev => ({ ...popup, isOpen: !prev.isOpen, }))} size={Size.MEDIUM} type={Type.OUTLINE} />
      </div>
    ) : undefined,
    className: styles.gridItem,
    darken: i === 3,
  })), []);

  return tour ? (
    <>
      <Popup onClose={() => setPopup({ ...popup, isOpen: false, })} open={popup.isOpen}>
        {popup.content}
      </Popup>
      <Head>
        <title>Milly adventurer - туры в России</title>
        <meta name="description" content="Туры и экспедиции по России" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero backgroundImage={mountainImg.src} navBarItems={sections}>
        <div>
          <small className={cn('date')}>{tour.date}</small>
          <h3 className={cn('title')}>{tour.name}</h3>
          <p className={cn('desc')}>{tour.description}</p>
          <ScrollLink to="tour_program" spy smooth color="white">
            <Button className={styles.cellButton} label="Отправиться в путешествие" onClick={() => { }} type={Type.FILLED} size={Size.LARGE} />
          </ScrollLink>
        </div>
      </Hero>
      <section id="tour_program" className={cn('sliderSection')}>
        <SectionContainer paddings={true}>
          <h2 className={cn('sliderSectionTitle')}>Куда же мы отправимся?</h2>
          <Slider dots speed={0} waitForAnimate={false} centerMode centerPadding={isMobile ? '10px' : '100px'} arrows={false} slidesToShow={1} infinite>
            {tour.program_short.map(({ description, name }, i) => (
              <article key={i} className={cn('slide')}>
                <div className={cn('slideContainer')} style={{
                  background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${mountainImg.src}) center center`
                }}>
                  <div className={cn('slideTextContainer')}>
                    <h3 className={cn('slideTitle')}>{i + 1} день - <EditableText onSave={(text: string) => editDay(Number(router.query.id), i, 'name', text)}>{name}</EditableText></h3>
                    <p className={cn('slideDescription')}><EditableText onSave={(text: string) => editDay(Number(router.query.id), i, 'description', text)}>{description}</EditableText></p>
                    <Link href={`/program/${router.query.id}`}>
                      <a>
                        <Button className={styles.slideButton} label="Узнать больше" onClick={() => { }} size={Size.MEDIUM} type={Type.OUTLINE} />
                      </a>
                    </Link>
                  </div>
                  {canEdit && (
                    <UploadImage onUpload={(base64: string) => editDay(Number(router.query.id), i, 'image', base64)}/>
                  )}
                </div>
              </article>
            ))}
          </Slider>
          {canEdit && (
            <div style={{ marginTop: 50, margin: '50px auto' }}>
              <Button onClick={addDay} label="Добавить день" />
            </div>
          )}
        </SectionContainer>
      </section>
      <div id="tour_me">
        <Me needPopupButtons={false} />
      </div>
      <Stories />
      <div id="tour_photo">
        <Grid content={gridContent} title="Как это было в прошлый раз" />
      </div>
      <section id="tour_qa">
        <SectionContainer>
          <h2 className={styles.accordionSectionTitle}>Ответы на ваши вопросы</h2>
          <div>
            <Accordion preExpanded={['0']} onChange={(indexes: string[]) => {
              setOpenedIds(indexes);
            }} className={styles.accordion} allowZeroExpanded allowMultipleExpanded={false}>
              {tour.qa.map(({ question, answer }, i) => (
                <AccordionItem key={i} uuid={`${i}`} className={styles.accordionItem}>
                  <AccordionItemHeading className={styles.accordionHeader}>
                    <AccordionItemButton className={styles.accordionButton}>
                      {question}
                      <Image src={ArrowDown} width={15} className={openedIds.includes(`${i}`) ? styles.arrowUp : ''} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className={styles.accordionItemDesc} dangerouslySetInnerHTML={{ __html: answer }} />
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionContainer>
      </section>
      <Book codeWord={tour.code_word} />
      <div style={{
        marginBottom: isMobile ? 30 : 60,
      }}></div>
      <Questions />
      <Footer />
    </>
  ) : null;
};

export default Tour;
