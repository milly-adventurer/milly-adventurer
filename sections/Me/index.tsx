import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import getClassNames from '../../helpers/classNames';
import styles from './Me.module.scss';

const cn = getClassNames(styles);

const Me = () => {
  return (
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
            <Button label="В кого Милена?" onClick={() => {}} size={Size.MEDIUM} type={Type.FILLED} />
          </div>
          <div className={cn('img')}></div>
        </article>
      </SectionContainer>
    </section>
  );
};

export default Me;
