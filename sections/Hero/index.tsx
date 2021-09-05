import { CSSProperties, PropsWithChildren } from "react";

import NavBar, { NavBarItems } from "../../components/NavBar";
import SectionContainer from "../../components/SectionContainer";
import BackgroundSlider from 'react-background-slider'

import styles from './Hero.module.scss';

interface Props {
  navBarItems: NavBarItems;
  style?: CSSProperties;
  backgroundImage?: string[];
  className?: string;
}

const Hero = ({
  navBarItems,
  style,
  backgroundImage = [''],
  children,
  className = '',
}: PropsWithChildren<Props>) => {
  return (
      <section className={`${styles.section} ${className}`} style={backgroundImage ? {
        backgroundImage: '',
        ...style,
        } : style}>
        <BackgroundSlider duration={6} images={backgroundImage} />
        <SectionContainer>
          <NavBar items={navBarItems} />
          <div className={styles.content}>
            {children}
          </div>
        </SectionContainer>
      </section>
  );
};

export default Hero;
