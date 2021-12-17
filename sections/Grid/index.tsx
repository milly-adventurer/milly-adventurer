import { ReactChild } from "react";
import SectionContainer from "../../components/SectionContainer";
import getClassNames from "../../helpers/classNames";

import styles from './Grid.module.scss';

const cn = getClassNames(styles);

export type Content = {
  backgroundImage?: string;
  child?: ReactChild;
  className?: string;
  darken?: boolean
	darkPercent?: number;
}[];

interface Props {
  title: string;
  content: Content;
	ds?: boolean;
  isTour?: boolean;
}

const Grid = ({
  title,
  content,
	ds = false,
  isTour = false,
}: Props) => {
  return (
    <section className={cn('section')}>
      <SectionContainer>
        <h2 className={`${ cn('title')} ${isTour ? styles.tourTitle : ''}`}>{title}</h2>
        <div className={cn('cellsContainer')}>
          {content.filter((a) => a.child).map(({ backgroundImage, child, className, darken = false, darkPercent = 0.3, }, i) => (
            <article style={{
							position: 'relative',
              background: darken ? `linear-gradient(rgba(0,0,0,${ds ? darkPercent : 0.5}), rgba(0,0,0,${ds ? darkPercent : 0.5})), url(${backgroundImage}) center center` : `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${backgroundImage}) center center`
            }} key={i} className={`${cn('cell')} ${className}`}>
              {child}
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default Grid;
