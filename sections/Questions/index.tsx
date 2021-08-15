import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import styles from './Questions.module.scss';

const Questions = () => {
  return (
    <section className={styles.section}>
      <SectionContainer>
        <h2 className={styles.title}>Оставлись вопросы?</h2>
        <p className={styles.description}>Ответы на многие свои вопросы вы можете найти в конкретных турах, но если у вас есть свой вопрос то:</p>
        <div className={styles.btns}>
          {/* <Button className={styles.btn} label="Пообщаться с клиентами" onClick={() => {}} type={Type.OUTLINE} size={Size.MEDIUM} /> */}
          <Button className={styles.btn} label="Поговорить со мной" onClick={() => {}} type={Type.OUTLINE} size={Size.MEDIUM} />
        </div>
      </SectionContainer>
    </section>
  );
};

export default Questions;
