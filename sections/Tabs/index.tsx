import React, { useContext, useState } from 'react';
import Button, { Size, Type } from '../../components/Button';
import SectionContainer from '../../components/SectionContainer';
import styles from './Tabs.module.scss';
import { WindowWidthContext } from '../../contexts/WindowWidth';
import EditableText from '../../components/EditableText';
import { Tab } from '../../interfaces/Tour';
import { DataContext } from '../../contexts/Data';
import ButtonClose from '../../components/ButtonClose';
import TabInfo from './TabInfo';
import UserInfoContext from '../../contexts/UserInfo';

interface Props {
  tabs: Tab[],
}

const Tabs = ({
  // tabs,
}: Props) => {
  const [activeButton, setActiveButton] = useState(0);
  const { isMobile } = useContext(WindowWidthContext);

  const { canEdit } = useContext(UserInfoContext);

  const { deleteTab, addNewTab, updateTabInfo, data } = useContext(DataContext);
  if (!data) return <></>;

  return (
    <section className={styles.section}>
      <SectionContainer paddings={!!isMobile}>
        <h2 className={styles.title}>Как это было в прошлый раз</h2>
        <div className={styles.buttonsContainer}>
          {[...data.tabs.map(({ name }, i) => (
            <Button key={i} size={Size.SMALL} type={Type.FILLED} className={`${activeButton !== i ? styles.unactiveButton : ''} ${styles.button}`} label={
              <div>
                {data.tabs.length !== 1 && canEdit && (
                  <ButtonClose height={13} width={13} onClick={() => {
                    setTimeout(() => {
                      setActiveButton(0);
                      deleteTab(i);
                    }, 0);
                  }}
                  className={styles.delTab}
                  />
                )}
                <EditableText iColor="black" onSave={(newValue: string) => { updateTabInfo(data.tabs[i].name, 'name', newValue);  }}>{name}</EditableText>
              </div>
            }
              onClick={() => setActiveButton(i)} />
          )), canEdit && <Button size={Size.SMALL} type={Type.OUTLINE} className={`${styles.button} ${styles.addTab}`} label={"+"} onClick={addNewTab} />]}
        </div>
        <TabInfo id={data.tabs[activeButton].id} isMobile={!!isMobile} activeButton={activeButton} tab={data.tabs[activeButton]} description={data.tabs[activeButton].description} pictures={data.tabs[activeButton].pictures}/>
      </SectionContainer>
    </section>
  );
};

export default Tabs;
