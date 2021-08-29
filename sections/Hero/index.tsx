import { CSSProperties, PropsWithChildren } from "react";

import NavBar, { NavBarItems } from "../../components/NavBar";
import SectionContainer from "../../components/SectionContainer";

import styles from './Hero.module.scss';

interface Props {
  navBarItems: NavBarItems;
  style?: CSSProperties;
  backgroundImage?: string;
  className?: string;
}

const Hero = ({
  navBarItems,
  style,
  backgroundImage,
  children,
  className = '',
}: PropsWithChildren<Props>) => {
  return (
    <section className={`${styles.section} ${className}`} style={backgroundImage ? {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImage})`,
      ...style,
    } : style}>
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
