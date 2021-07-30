import React, { PropsWithChildren } from 'react';
import getClassNames from '../../helpers/classNames';

import styles from './SectionContainer.module.scss';

const cn = getClassNames(styles);

const SectionContainer = ({
  children,
  className,
  paddings = false,
}: PropsWithChildren<{
  className?: string;
  paddings?: boolean
}>) => {
  return (
    <div className={cn('container', className, paddings ? 'noPaddings' : '')}>
      {children}
    </div>
  );
};

export default SectionContainer;
