import React, { useContext, useState } from 'react';
import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import styles from './Tabs.module.scss';
import { WindowWidthContext } from '../../contexts/WindowWidth';
import EditableText from '../../components/EditableText';
import { NewData as NewDataType } from '../../interfaces/Tour';
import { DataContext } from '../../contexts/Data';
import ButtonClose from '../../components/ButtonClose';
import TabInfo from './TabInfo';
import { UserInfoContext } from '../../contexts/UserInfo';

interface Props {
  // tabs: PreviousTour[],
}

const Tabs = ({
  // tabs,
}: Props) => {
  const [activeButton, setActiveButton] = useState(0);
  const { isMobile } = useContext(WindowWidthContext);

  const { canEdit } = useContext(UserInfoContext);

  const { newData, updateNewData } = useContext(DataContext);
  if (!newData) return <></>;

  const updateTabInfo = async (tabIndex: number, info: 'name' | 'description', newText: string) => {
    const d: NewDataType = {
      ...newData,
			common: {
				...newData.common,
				previous_tours: newData.common.previous_tours.map((tab, i) => {
					if (tabIndex === i) {
						return {
							...tab,
							name: info === 'name' ? newText : tab.name,
							description: info === 'description' ? newText :  tab.description,
						}
					}
					return tab;
				}),
			},
    }

    updateNewData(d);
  };

	const addNewTab = async () => {
    const d: NewDataType = {
      ...newData,
			common: {
				...newData.common,
				previous_tours: [...newData.common.previous_tours, {
					name: 'Пусто',
					description: 'Пусто',
					images: [],
					index: newData.common.previous_tours.length,
				}],
			},
    }

    updateNewData(d);
  };
	
	const deleteTab = (tabId: number) => {
		const d: NewDataType = {
			...newData,
			common: {
				...newData.common,
				previous_tours: newData.common.previous_tours.filter(({ index }, i) => i !== tabId),
			},
		};

		updateNewData(d);
	}

  return (
    <section className={styles.section}>
      <SectionContainer paddings={!!isMobile}>
        <h2 className={styles.title}>Как это было в прошлый раз</h2>
        <div className={styles.buttonsContainer}>
          {[...newData.common.previous_tours.map(({ name, index }, i) => (
            <Button key={i} size={Size.SMALL} type={Type.FILLED} className={`${activeButton !== i ? styles.unactiveButton : ''} ${styles.button}`} label={
              <div>
                {newData.common.previous_tours.length > 1 && canEdit && (
                  <ButtonClose height={13} width={13} onClick={() => {
                    setTimeout(() => {
                      let ab = 0;
                      // if (i === 0) ab = 1;
                      setActiveButton(ab);
                      deleteTab(i);
                    }, 0);
                  }}
                  className={styles.delTab}
                  />
                )}
                <EditableText iColor="black" onSave={(newValue: string) => { updateTabInfo(i, 'name', newValue);  }}>{name}</EditableText>
              </div>
            }
              onClick={() => setActiveButton(i)} />
          )), canEdit && <Button size={Size.SMALL} type={Type.OUTLINE} className={`${styles.button} ${styles.addTab}`} label={"+"} onClick={addNewTab} />]}
        </div>
        <TabInfo
					onUpdate={updateTabInfo}
					id={activeButton}
					isMobile={!!isMobile}
          activeButton={activeButton}
					tab={newData.common.previous_tours[activeButton]}
					description={newData.common.previous_tours[activeButton].description}
					pictures={newData.common.previous_tours[activeButton].images.map((img, i) => {
						return img
						? `https://imagedelivery.net/mJnGC39eOdMDhMEQde3rlw/${img}/public`
						: ''
					})}
				/>
      </SectionContainer>
    </section>
  );
};

export default Tabs;
