import { CSSProperties, PropsWithChildren } from "react";

import NavBar, { NavBarItems } from "../../components/NavBar";
import SectionContainer from "../../components/SectionContainer";

import styles from './Hero.module.scss';

interface Props {
  navBarItems: NavBarItems;
  style?: CSSProperties;
  backgroundImage?: string; // url
}

const Hero = ({
  navBarItems,
  style,
  backgroundImage,
  children
}: PropsWithChildren<Props>) => {
  return (
    <section className={styles.section} style={backgroundImage ? {
      backgroundImage: `url(${backgroundImage})`,
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
