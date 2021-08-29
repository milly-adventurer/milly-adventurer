import Image from "next/image";
import React, { ReactChild, useContext, useMemo, useState } from "react";
import EditableText from "../../../components/EditableText";
import Popup from "../../../components/Popup";
import Gallery from "../../../components/Popup/Gallery";
import { DataContext } from "../../../contexts/Data";
import { Tab } from "../../../interfaces/Tour";
import styles from '../Tabs.module.scss';
import arrow from '../../../assets/img/arrow.svg';

interface Props {
  description: string;
  pictures: string[];
  isMobile: boolean;
  activeButton: number;
  id: string;
  tab: Tab;
}

const TabInfo = ({
  description,
  pictures,
  activeButton,
  tab,
  id,
  isMobile,
}: Props) => {
  const { updateTabInfo, data } = useContext(DataContext);
  console.log(pictures);

  const [popup, setPopup] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });
  console.log(activeButton, 'id', data?.tabs);
  const content = (
    <Popup onClose={() => setPopup({ isOpen: false, })} open={popup.isOpen}>
      {<Gallery
        imgs={pictures}
        tabId={activeButton}
        onClose={() => setPopup({ isOpen: false })}
        label={<span dangerouslySetInnerHTML={{ __html: `${tab.name} фотографии` }}/>}
      />}
    </Popup>
    );

  return (
    <div>
      {content}
      <p className={styles.description}>
        <EditableText iColor="black" onSave={(newValue: string) => { updateTabInfo(tab.name, 'description', newValue) }}>{description || ''}</EditableText></p>
      <div className={styles.imgs}>
        {pictures.slice(0, 4).map((picture, i) => (
          <div key={i} className={styles.img} style={{
            background: `url(${picture}) center center`
          }} />
        ))}
      </div>
      <div className={styles.showMoreWrapper}>
        <button onClick={() => setPopup(prev => ({ ...popup, isOpen: !prev.isOpen }))} className={styles.showMore}>
          Больше фотографий
          <div style={{
            marginLeft: '10px',
            display: 'flex',
          }}>
            <Image src={arrow} width={isMobile ? undefined : 30} height={isMobile ? undefined : 20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TabInfo;