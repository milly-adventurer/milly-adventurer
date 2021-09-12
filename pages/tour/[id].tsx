import Head from 'next/head';
import Hero from '../../sections/Hero';
import mountainImg from '../../assets/img/mountain.jpg';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Button, { Size, Type } from '../../components/Button';
import styles from '../../styles/Tour.module.scss';
import getClassNames from '../../helpers/classNames';
import SectionContainer from '../../components/SectionContainer';
import { useContext } from 'react';
import { WindowWidthContext } from '../../contexts/WindowWidth';
import Slider from 'react-slick';
import Link from 'next/link';
import Me from '../../sections/Me';
import Stories from '../../sections/Stories';
import Grid, { Content } from '../../sections/Grid';
import baikalImg from '../../assets/img/baikal.jpg';

// import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
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
import UserInfoContext from '../../contexts/UserInfo';
import UploadImage from '../../components/UploadImage';
import ButtonClose from '../../components/ButtonClose';
import WhatIncluded from '../../components/Popup/WhatIncluded';
import Price from '../../components/Popup/Price';
import BookPopup from '../../components/Popup/Book';

const cn = getClassNames(styles);

const sections: NavBarItems = [
  [<Link href="/">Главная</Link>, ''],
  ['Программа', 'tour_program'],
  ['Обо мне', 'tour_me'],
  ['Фотографии', 'tour_photo'],
];

const Tour = () => {
  const router = useRouter();
  const { isMobile } = useContext(WindowWidthContext);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const {
    getTourById,
    updateDay,
    addDay,
    data,
    deleteDay,
    addTourLastTimeImage,
    deleteTourLastTimeImage,
    addQA,
    editQA,
  } = useContext(DataContext);
  const { canEdit } = useContext(UserInfoContext);
  const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, data]);

  if (!tour) return <></>;

  useEffect(() => {
    if (!tour) {
      router.push('/');
    }
  }, [tour]);

  const [popup, setPopup] = useState<{
    isOpen: boolean;
		content: null | ReactNode;
  }>({
    isOpen: false,
		content: null
  });
	console.log(tour);
	const popups = useMemo(() => {
    const info = tour.info || {};

    return [
			info[3] && {
        question: 'Какова цена?',  // info[3].question,
        content: (
          <Price price={'35 тысяч рублей'} onGoClick={() => setPopup({ isOpen: true, content: <BookPopup codeWord={tour.code_word} onClose={() => setPopup({ ...popup, isOpen: false })} /> })} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какая цена'} text={`Я предлагаю вам незабываемое путешествие, в котором вы  сможете отдонхнуть и т.д. Вообщем надо описать так чтобы еще раз напомнить человеку что за такое не жалко отдать денег.`}
          />
        )
      },
      info[0] && {
        question: 'Что включено?',  // info[0].question,
        content: (
          <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label={'Что включено'} text={`♡ Встреча в аэропорту
          ♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
          ♡ Проживание в гостевых домах и на турбазах по программе
          ♡ Завтраки, обеды и ужины
          ♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
          ♡ Сопровождение опытным гидом-водителем и организатором
          ♡ Входные билеты
          ♡ Паромная переправа
          ♡ Заброски на труднодоступные локации на внедорожниках
          ♡ Трансфер в аэропорт
          ♡ Страховка от укуса клеща
          ♡ Горячий чай, кофе, вода, перекус в дорогу.`}
          />
        ),
      },
      info[1] && {
        question: 'Какие расходы?',  // info[1].question,
        content: (
          <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какие расходы'} text={`♡ Встреча в аэропорту
          ♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
          ♡ Проживание в гостевых домах и на турбазах по программе
          ♡ Завтраки, обеды и ужины
          ♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
          ♡ Сопровождение опытным гидом-водителем и организатором
          ♡ Входные билеты
          ♡ Паромная переправа
          ♡ Заброски на труднодоступные локации на внедорожниках
          ♡ Трансфер в аэропорт
          ♡ Страховка от укуса клеща
          ♡ Горячий чай, кофе, вода, перекус в дорогу.`}
          />
        ),
      },
      info[2] && {
        question: 'Частые вопросы', // info[2].question,
        content: (
          <WhatIncluded onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какие расходы'} text={`♡ Встреча в аэропорту
          ♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута
          ♡ Проживание в гостевых домах и на турбазах по программе
          ♡ Завтраки, обеды и ужины
          ♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
          ♡ Сопровождение опытным гидом-водителем и организатором
          ♡ Входные билеты
          ♡ Паромная переправа
          ♡ Заброски на труднодоступные локации на внедорожниках
          ♡ Трансфер в аэропорт
          ♡ Страховка от укуса клеща
          ♡ Горячий чай, кофе, вода, перекус в дорогу.`}
          />
        ),
      }
    ]
  }, [popup, data]);

	// Дополнительная информация
  const gridProgramContent: Content = useMemo(() => popups.map((item, i) => item ? ({
    darken: true,
    child: (
      <div className={cn('cell')}>
        <strong className={cn('cellTitle')}>
          {item.question}
        </strong>
        <Button label="Подробнее" onClick={() => { setPopup(prev => ({ content: item.content, isOpen: true })) }} type={Type.OUTLINE} size={Size.LARGE} />
      </div>
    ),
    className: cn('cellWrapper'),
    backgroundImage: baikalImg.src,
  }) : {}), []);
	// Картинки последнего тура
	const gridContent: Content = (tour.lastPictures || []).slice(0, 4).map((item, i) => ({
    backgroundImage: item,
    child: i === tour.lastPictures.slice(0, 4).length - 1 ? (
      <div className={styles.gridItem}>
        <p>+50 фотографий</p>
        <Button label="Открыть" onClick={() => setPopup(prev => ({ content: popupGallaryContent, isOpen: true }))} size={Size.MEDIUM} type={Type.OUTLINE} />
      </div>
    ) : undefined,
    className: styles.gridItem,
    darken: i === tour.lastPictures.slice(0, 4).length - 1,
  }));

  const popupGallaryContent = (
		<Gallery onDeleteImage={(i: number) => deleteTourLastTimeImage(Number(router.query.id), i)} onUpload={(base64: string) => addTourLastTimeImage(Number(router.query.id), base64)} onClose={() => setPopup({ ...popup, isOpen: false })} label="Фотографии" imgs={tour.lastPictures} />
  );

	const getProgramFullContent = (index: number) => (
		<div className={`${styles.popupContent} popupContent`}>
      <div className={styles.content}>
				<h4>{tour.program[index].name}</h4>
				<p>{tour.program[index].description}</p>
				<div style={{
					background: `url(${tour.program[index].picture})`,
				}} className={cn('dayImg')} />
				<ButtonClose className={styles.buttonClose} onClick={() => { setPopup({ content: null, isOpen: false }) }} />
      </div>
    </div>
	);

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
      <Hero backgroundImage={[mountainImg.src]} navBarItems={sections}>
        <div>
          <small className={cn('date')} dangerouslySetInnerHTML={{ __html: tour.date }} />
          <h3 className={cn('title')} dangerouslySetInnerHTML={{ __html: tour.name }} />
          <p className={cn('desc')} dangerouslySetInnerHTML={{ __html: tour.description }} />
          <ScrollLink to="tour_program" spy smooth color="white">
            <Button className={styles.cellButton} label="Отправиться в путешествие" onClick={() => { }} type={Type.FILLED} size={Size.LARGE} />
          </ScrollLink>
        </div>
      </Hero>
      <section id="tour_program" className={cn('sliderSection')}>
        <SectionContainer paddings={true}>
          <h2 className={cn('sliderSectionTitle')}>Куда же мы отправимся?</h2>
          <Slider dots speed={0} waitForAnimate={false} centerMode centerPadding={isMobile ? '10px' : '100px'} arrows={false} slidesToShow={1} infinite>
            {tour.program_short.map(({ description, name, image }, i) => (
              <article key={i} className={cn('slide')}>
                <div className={cn('slideContainer')} style={{
                  background: image && `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image}) center center` || 'black',
                }}>
                  <div className={cn('slideTextContainer')}>
                    <h3 className={cn('slideTitle')} style={{ display: 'flex' }}><EditableText onSave={(text: string) => updateDay(Number(router.query.id), i, 'name', text)}>{name}</EditableText></h3>
                    <p className={cn('slideDescription')}><EditableText onSave={(text: string) => updateDay(Number(router.query.id), i, 'description', text)}>{description}</EditableText></p>
                    <Button className={styles.slideButton} label="Узнать больше" onClick={() => {
											setPopup({ content: getProgramFullContent(i), isOpen: true })
										}} size={Size.MEDIUM} type={Type.OUTLINE} />
                    {canEdit && i !== tour.program_short.length - 1 && (
                      <ButtonClose className={styles.delImg} onClick={() => deleteDay(Number(router.query.id), i)}/>
                    )}
                    {canEdit && (
                      <div style={{ marginTop: 20 }}>
                        <UploadImage noButton onUpload={(base64: string) => updateDay(Number(router.query.id), i, 'image', base64)}/>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </Slider>
          {canEdit && (
            <div style={{ marginTop: 50, margin: '50px auto' }}>
              <Button onClick={() => addDay(Number(router.query.id))} label="Добавить день" />
            </div>
          )}
        </SectionContainer>
      </section>
      <div id="tour_me">
        <Me needPopupButtons={false} />
      </div>
      <div id="tour_photo">
        <Grid content={gridContent} title="Как это было в прошлый раз" />
      </div>
			<div className={styles.storiesSection}><Stories /></div>
			<div id="info">
        <Grid title="Дополнительная информация" content={gridProgramContent} />
      </div>
			<div className={styles.book}>
      	<Book codeWord={tour.code_word} />
			</div>
      <Questions />
      <Footer />
    </>
  ) : null;
};

export default Tour;
