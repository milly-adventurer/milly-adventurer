import SectionContainer from '../../components/SectionContainer';
import getClassNames from '../../helpers/classNames';
import styles from './Footer.module.scss';
import logo from '../../assets/img/logo-footer.png';
import Image from 'next/image';

const cn = getClassNames(styles);

const Footer = () => {
  return (
    <footer className={cn('section')}>
      <SectionContainer>
        <div className={cn('footer')}>
          <div>
            <Image width={115} height={100} src={logo} alt="Logo" />
          </div>
          <p className={cn('desc')}>Данная услуга не является туроператорской деятельностью. Под туром подразумевается разовая помощь в организации поездки от имени клиента согласно настоящему договору-поручению.</p>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
