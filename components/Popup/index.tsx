import React, { PropsWithChildren } from 'react';

import LibPopup from 'reactjs-popup';

interface Props {
  onClose?(): void;
  lockScroll?: boolean;
  modal?: boolean;
  className?: string;
  open?: boolean;
}

const Popup = ({ onClose, lockScroll = true, modal = true, className, open = false, children }: PropsWithChildren<Props>) => {
  return (
    <LibPopup repositionOnResize={true} className={className} onClose={onClose} open={open} lockScroll={lockScroll} modal={modal} overlayStyle={{
      background: `rgba(0,0,0, 0.6)`,
    }}>
      {children}
    </LibPopup>
  );
};

export default Popup;
