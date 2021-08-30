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
import EditableText from '../../components/EditableText';

const cn = getClassNames(styles);

const sections: [ReactNode, string][] = [
  [<Link href="/">Главная</Link>, ''],
  ['Программа', 'program'],
  ['Дополнительная инормация', 'info'],
  ['Забронировать', 'book'],
];

const Program = () => {
  const router = useRouter();
  const { getTourById, data, updateProgramDay } = useContext(DataContext);
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
      },
      info[3] && {
        question: 'Какова цена?',  // info[3].question,
        content: (
          <Price price={'35 тысяч рублей'} onGoClick={() => setPopup({ isOpen: true, content: <BookPopup codeWord={tour.code_word} onClose={() => setPopup({ ...popup, isOpen: false })} /> })} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какая цена'} text={`Я предлагаю вам незабываемое путешествие, в котором вы  сможете отдонхнуть и т.д. Вообщем надо описать так чтобы еще раз напомнить человеку что за такое не жалко отдать денег.`}
          />
        )
      }
    ]
  }, [popup, data]);

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
          <small className={cn('date')} dangerouslySetInnerHTML={{ __html: tour.date }} />
          <h3 className={cn('title')} dangerouslySetInnerHTML={{ __html: tour.name }} />
          <p className={cn('desc')} dangerouslySetInnerHTML={{ __html: tour.description }} />
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
                    <h3 className={cn('dayTitle')} style={{ display: 'flex' }}>День {i + 1} - <EditableText iColor="black" onSave={(text: string) => updateProgramDay(Number(router.query.id), i, 'name', text)}>{name}</EditableText></h3>
                    <p className={cn('dayDesc')}><EditableText iColor="black" onSave={(text: string) => updateProgramDay(Number(router.query.id), i, 'description', text)}>{description}</EditableText></p>
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
