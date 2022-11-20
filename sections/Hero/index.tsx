import { CSSProperties, PropsWithChildren } from "react";

import NavBar, { NavBarItems } from "../../components/NavBar";
import SectionContainer from "../../components/SectionContainer";
import BackgroundSlider from 'react-background-slider'

import styles from './Hero.module.scss';
import getLinearGradient from "../../helpers/linearGradient";

interface Props {
  navBarItems: NavBarItems;
  style?: CSSProperties;
  backgroundImage?: string[];
  className?: string;
	ds?: boolean;
}

const Hero = ({
  navBarItems,
  style,
  backgroundImage = [''],
  children,
  className = '',
	ds = false,
}: PropsWithChildren<Props>) => {
  return (
      <section
				className={`${styles.section} ${className}`}
				style={
					backgroundImage ? {
       			background: backgroundImage.length === 1
							? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage[0]}) center center`
							: undefined,
        		...style,
        	} : style
				}
			>
				{backgroundImage.length > 1 && (
          <BackgroundSlider transition={1} duration={6} images={backgroundImage} />
				)}
          <NavBar items={navBarItems} />
					<SectionContainer>
						<div className={styles.content}>
							{children}
						</div>
					</SectionContainer>
					1
      </section>
  );
};

export default Hero;
