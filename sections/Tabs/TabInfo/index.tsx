import Image from "next/image";
import React, { useContext, useState } from "react";
import EditableText from "../../../components/EditableText";
import Popup from "../../../components/Popup";
import Gallery from "../../../components/Popup/Gallery";
import { DataContext } from "../../../contexts/Data";
import { PreviousTour, NewData as NewDataType } from "../../../interfaces/Tour";
import styles from '../Tabs.module.scss';
import arrow from '../../../assets/img/arrow.svg';

interface Props {
  description: string;
  pictures: string[];
  isMobile: boolean;
  activeButton: number;
  id: number;
  tab: PreviousTour;
	onUpdate(index: number, type: 'description', value: string): void;
}

const TabInfo = ({
  description,
  pictures,
  activeButton,
  tab,
  isMobile,
	onUpdate,
	id,
}: Props) => {
  const { newData, updateNewData } = useContext(DataContext);

	if (!newData) return <></>;

  const [popup, setPopup] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });

	const onAddImageToTab = async (tabId: number, imgBase64: string) => {
    const d: NewDataType = {
      ...newData,
      common: {
				...newData.common,
				previous_tours: newData.common.previous_tours.map((tab, i) => {
					if (tabId === i) {
						return {
							...tab,
							images: [...tab.images, imgBase64],
						}
					}
	
					return tab;
				})
			},
    }

    updateNewData(d);
  };
	
	const onDeleteImageFromTab = async (tabId: number, index: number) => {
    const d: NewDataType = {
      ...newData,
      common: {
				...newData.common,
				previous_tours: newData.common.previous_tours.map((tab, i) => {
					if (tabId === i) {
						return {
							...tab,
							images: tab.images.filter((_, j) => j !== index),
						}
					}
	
					return tab;
				}),
			},
    }

    updateNewData(d);
  };

  const content = (
    <Popup onClose={() => setPopup({ isOpen: false, })} open={popup.isOpen}>
      {<Gallery
        type="else"
        activeButton={activeButton}
        onUpload={(base64: string) => onAddImageToTab(activeButton, base64)}
        onDeleteImage={(index: number) => onDeleteImageFromTab(activeButton, index)}
        imgs={pictures}
        onClose={() => setPopup({ isOpen: false })}
        label={<span dangerouslySetInnerHTML={{ __html: `${tab.name}` }}/>}
      />}
    </Popup>
    );

  return (
    <div>
      {content}
      <p className={styles.description}>
        <EditableText iColor="black" onSave={(newValue: string) => { onUpdate(activeButton, 'description', newValue) }}>{description || ''}</EditableText></p>
      <div className={styles.imgs}>
        {pictures.slice(0, 4).map((picture, i) => (
          <div key={i} className={styles.img} style={{
            background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${picture}) center center`
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
