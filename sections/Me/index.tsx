import { ReactChild, useMemo, useState } from 'react';
import Popup from '../../components/Popup';
import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import getClassNames from '../../helpers/classNames';
import styles from './Me.module.scss';

import millyImg from '../../assets/img/popup-milly.jpg';
import ButtonClose from '../../components/ButtonClose';

const cn = getClassNames(styles);

const Me = () => {
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    content: ReactChild | null;
  }>({
    isOpen: false,
    content: (
      <div className={`${cn('popupContent')} popupContent`}>
        <ButtonClose className={styles.buttonClose} onClick={() => setPopup({ ...popup, isOpen: false })} />
        <div className={styles.popupInner}>
          <h4 className={cn('popupTitle')}>Я влюбилась в Россию</h4>
          <p className={cn('popupDesc')}>
            Мы посетим старейшую гору Алтая - Адыр Кайя, с которой совершим полет на парапланах и увидим множество мелких деревушек над нами.
            А пока вы будете наслаждаться полетом, вас будет снимать наш профессиональный фотограф. 
            <br />
            <br />
            Мы посетим старейшую гору Алтая - Адыр Кайя, с которой совершим полет на парапланах и увидим множество мелких деревушек над нами.
            А пока вы будете наслаждаться полетом, вас будет снимать наш профессиональный фотограф. 
          </p>
          <div className={cn('popupImgs')}>
            <div className={cn('popupImg')} style={{
              background: `url(${millyImg.src})`,
            }}/>
            <div className={cn('popupImg')} style={{
              background: `url(${millyImg.src})`,
            }}/>
          </div>
          <h4 className={cn('popupTitle')}>Немного фактов обо мне</h4>
          <p className={cn('popupDesc', 'popupAboutDesc')}>
            Встреча в аэропорту
            <br />
            ♡ Трансфер на комфортабельном минивэне на протяжении всего маршрута<br />
            ♡ Проживание в гостевых домах и на турбазах по программе<br />
            ♡ Завтраки, обеды и ужины<br />
            ♡ Насыщенная экскурсионная программа по самым красивым пейзажам и местам силы Горного Алтая
          </p>
          <h4 className={cn('popupTitle')}>Хотите отправиться со мной  в тур?</h4>
          <div className={cn('buttons')}>
            <Button label="Да, хочу" onClick={() => {}} type={Type.FILLED} size={Size.MEDIUM}/>
            <Button className={cn('outlineButton')} label="Я еще осмотрюсь" onClick={() => setPopup({ ...popup, isOpen: false })} type={Type.OUTLINE} size={Size.MEDIUM}/>
          </div>
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
              <h4 className={cn('title')}>Я Милена - ваш личный гид</h4>
              <div className={cn('features')}>
                <strong>● 7 лет в туризме</strong>
                <strong>● Индивидуальный подход</strong>
                <strong>● Более 50 туров</strong>
              </div>
              <p className={cn('description')}>Когда мне исполнилось 40 лет я влюбилась...</p>
              <Button label="В кого Милена?" onClick={() => setPopup(({ isOpen }) => ({...popup, isOpen: !isOpen}))} size={Size.MEDIUM} type={Type.FILLED} />
            </div>
            <div className={cn('img')}></div>
          </article>
        </SectionContainer>
      </section>
    </>
  );
};

export default Me;
