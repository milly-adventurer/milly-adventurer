import { ReactChild, useContext, useMemo } from "react";
import SectionContainer from "../../components/SectionContainer";
import UploadImage from "../../components/UploadImage";
import EditContext from "../../contexts/Edit";
import UserInfoContext from "../../contexts/UserInfo";
import getClassNames from "../../helpers/classNames";

import styles from './Grid.module.scss';

const cn = getClassNames(styles);

export type Content = {
  backgroundImage?: string;
  child?: ReactChild;
  className?: string;
  darken?: boolean
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
  const slicedContent = useMemo(() => content.slice(0, 4), [content]);

  return (
    <section className={cn('section')}>
      <SectionContainer>
        <h2 className={`${ cn('title')} ${isTour ? styles.tourTitle : ''}`}>{title}</h2>
        <div className={cn('cellsContainer')}>
          {slicedContent.map(({ backgroundImage, child, className, darken = false }, i) => (
            <article style={{
              background: darken ? `linear-gradient(rgba(0,0,0,${ds ? 0.3 : 0.5}), rgba(0,0,0,${ds ? 0.3 : 0.5})), url(${backgroundImage}) center center` : `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${backgroundImage}) center center`
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
