import { ReactChild, useMemo, useState } from 'react';
import Popup from '../../components/Popup';
import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import getClassNames from '../../helpers/classNames';
import styles from './Me.module.scss';

import millyImg from '../../assets/img/popup-milly.jpg';
import ButtonClose from '../../components/ButtonClose';

const cn = getClassNames(styles);

const Me = ({
  needPopupButtons = true,
}:{
  needPopupButtons?: boolean;
}) => {
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    content: ReactChild | null;
  }>({
    isOpen: false,
    content: (
      <div className={`${cn('popupContent')} popupContent`}>
        <ButtonClose className={styles.buttonClose} onClick={() => setPopup({ ...popup, isOpen: false })} />
        <div className={styles.popupInner}>
          {/* <h4 className={cn('popupTitle')}>Я влюбилась в Россию</h4> */}
          <p className={cn('popupDesc')}>
          Когда мне исполнилось 40 лет я влюбилась…<br/>
          В Россию и ее прекрасные земли, наполненные потрясающими людьми, культурами и обычаями, с которыми я знакомлю гостей в моих турах.
          <br />
          <br />
          Я много путешествовала по миру и посетила 25 стран в поисках своего места силы. Увлеченно исследовала и открывала для себя новые направления, составляла сложные маршруты и коллекционировала эмоции.
          <br />
          <br />
          С каждым разом я все больше понимала, что хочу помогать людям в организации путешествия их мечты, испытывала огромное желание показать им самые прекрасные уголки и поделиться своими эмоциями, опытом и знаниями.
          <br />          <br />
          Поэтому в 2016 году я оставила карьеру графического дизайнера и фотографа в крупной компании и начала все с нуля в сфере туризма.
          <br />          <br />
          Я закончила курсы менеджера по туризму и успешно проработала 3 года в московском турагентстве Coral Travel.
          За это время помогла организовать отдых сотням людей, которые потом возвращались ко мне снова и снова за подбором нового путешествия.
          <br />          <br />
          Я буквально жила на работе и была очень рада, что имела возможность помогать людям.
          Однако я мечтала создавать свои собственные авторские туры. Поэтому я прошла очень ценный и экспернтый курс от Леонида Тропина и организовала свой первый тур на Бали.
          <br />          <br />
          После этого путешествия и радости в глазах людей, которую я увидела, сомнений больше не осталось. Я решила заниматься организацией туров и мы с семьей переехали на Бали, что являлось моей давней заветной мечтой.
          <br />          <br />
          Но прожив там несколько месяцев, я вдруг почувствовала тоску, которая камнем лежала на душе. Это была тоска по России. Я, как Сантьяго из «Алхимика» Паоло Коэльо, поняла, что настоящее сокровище вовсе не за океаном. Оно здесь, на моей родине.
          <br />          <br />
          И хотя пандемия для многих стала настоящим испытанием, для меня же, напротив, она стала возможностью. Я посвятила время исследованию России. Была восхищена красотой и величием нашей страны, узнала много того, о чем не знают даже профессиональные гиды, которые показывают своим туристам одни и те же "популярные" места.
          <br />          <br />
          Ну а я же поняла, что нужно раскрывать душу того места, где человек находится. Чтобы он мог наполнить себя энергией и впечатлениями и оставить по итогу приятные воспоминания, греющие душу.
          <br />          <br />
          За прошедший год я организовала 18 душевных авторских туров по четырём направлениям России: Горный Алтай, Байкал, Дагестан и Крым.
          <br />          <br />
          Я счастлива, что мне удалось наконец найти свое место силы, где моя душа поёт от счастья. Моим истинным домом и основным направлением стал Горный Алтай.
          <br />          <br />
          Летом 2021 года я переехала из Москвы в Горно-Алтайск, закончила профессиональные курсы гидов-экскурсоводов и получила сертификат и удостоверение экскурсовода.
          <br />          <br />
          Я с огромной любовью создаю авторские туры, организовываю индивидуальные путешествия для моих гостей и разрабатываю маршруты любой сложности. Вкладываю душу в мое любимое дело и испытываю удовольствие от счастливых улыбок моих гостей.
          <br />          <br />
          Для меня очень важен комфорт, высокое качество сервиса, искренняя забота и индивидуальный подход к каждому гостю.
          <br />          <br />
          Поэтому если вы хотите отправиться в настоящее и захватывающее путешествие по просторам нашей страны и при этом не испытывать проблем с обдумыванием логистики, бронированием отелей и поиском комфортных вариантов по соотношению цена/качества, а вместо этого погрузиться в яркое и красочное путешествие, то я предлагаю вам пройти этот путь вместе со мной.
          <br />          <br />
          Я проведу вас по таким местам, о которых знает далеко не каждый гид и познакомлю вас с местными жителями, которые, как никто лучше раскроют душу того места, в котором они живут.
          </p>
          <div className={cn('popupImgs')}>
            <div className={cn('popupImg')} style={{
              background: `url(${millyImg.src})`,
            }}/>
          </div>
          {/* {false && (
            <>
              <h4 className={cn('popupTitle')}>Хотите отправиться со мной  в тур?</h4>
              <div className={cn('buttons')}>
                <Button label="Да, хочу" onClick={() => {}} type={Type.FILLED} size={Size.MEDIUM}/>
                <Button className={cn('outlineButton')} label="Я еще осмотрюсь" onClick={() => setPopup({ ...popup, isOpen: false })} type={Type.OUTLINE} size={Size.MEDIUM}/>
              </div>
            </>
          )}  */}
        </div>
      </div>
    ),
  });

  return (
    <>
      <Popup onClose={() => setPopup({ ...popup, isOpen: false })} className={styles.popup} open={popup.isOpen}>
        {popup.content}
      </Popup>
      <section className={cn('section')}>
        <SectionContainer>
          <article className={cn('content')}>
            <div className={cn('textContainer')}>
              <h4 className={cn('title')}>Привет, я - Милена <br/> - ваш личный гид</h4>
              <p className={cn('description')}>И организатор душевных авторских туров по России, созданных с любовью</p>
              <Button label="Моя история" onClick={() => setPopup(({ isOpen }) => ({...popup, isOpen: !isOpen}))} size={Size.MEDIUM} type={Type.FILLED} />
            </div>
            <div className={cn('img')}></div>
          </article>
        </SectionContainer>
      </section>
    </>
  );
};

export default Me;
