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
        backgroundImage: backgroundImage.length === 1 ? `url(${backgroundImage[0]})` : '',
        ...style,
        } : style}>
				{backgroundImage.length > 1 && (
					<BackgroundSlider transition={1} duration={6} images={backgroundImage} />
				)}
          <NavBar items={navBarItems} />
					<SectionContainer>
						<div className={styles.content}>
							{children}
						</div>
					</SectionContainer>
      </section>
  );
};

export default Hero;
