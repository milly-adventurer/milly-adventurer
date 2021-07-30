import { ReactChild, useMemo } from "react";
import SectionContainer from "../../components/SectionContainer";
import getClassNames from "../../helpers/classNames";

import styles from './Grid.module.scss';

const cn = getClassNames(styles);

export type Content = {
  backgroundImage?: string;
  child?: ReactChild;
  className?: string;
}[];

interface Props {
  title: string;
  content: Content;
}

const Grid = ({
  title,
  content
}: Props) => {
  const slicedContent = useMemo(() => content.slice(0, 4), [content]);

  return (
    <section className={cn('section')}>
      <SectionContainer>
        <h2 className={cn('title')}>{title}</h2>
        <div className={cn('cellsContainer')}>
          {slicedContent.map(({ backgroundImage, child, className }, i) => (
            <article style={{
              backgroundImage: `url(${backgroundImage})`
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
