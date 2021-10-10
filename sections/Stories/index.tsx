import SectionContainer from '../../components/SectionContainer';
import styles from './Stories.module.scss';

import { PropsWithChildren, useContext } from 'react';
import Slider, { Settings } from 'react-slick';
import { WindowWidthContext } from '../../contexts/WindowWidth';
import { DataContext } from '../../contexts/Data';
import EditableText from '../../components/EditableText';
import { NewData as NewDataType } from '../../interfaces/Tour';
import { UserInfoContext } from '../../contexts/UserInfo';
import ButtonClose from '../../components/ButtonClose';
import Button, { Type } from '../../components/Button';

const Comment = ({ name, text, i, deleteComment }: { name: string, text: string, i: number, deleteComment(i: number): void; }) => {
	const { newData, updateNewData } = useContext(DataContext);
	const { canEdit } = useContext(UserInfoContext);

	if (!newData) return <></>;

	const onSave = (i: number, t: 'name' | 'text', data: string) => {
		const d: NewDataType = {
			...newData,
			common: {
				...newData.common,
				reviews: newData?.common.reviews.map((r, j) => {
					if (j === i) {
						return {
							...r,
							[t]: data,
						}
					}
					return r;
				})
			}
		};

		updateNewData(d);
	};

	return (
		<article className={styles.card}>
			<strong className={styles.name}><EditableText iColor="black" onSave={(t: string) => onSave(i, 'name', t)}>{name}</EditableText></strong>
			<p className={styles.comment}><EditableText iColor="black" onSave={(t: string) => onSave(i, 'text', t)}>{text}</EditableText></p>
			{canEdit && newData.common.reviews.length > 1 && (
				<ButtonClose className={styles.del} onClick={() => deleteComment(i)} />
			)}
		</article>
	);
};

const DivOrSlider = ({
	isSlider,
	children,
	options,
	className,
}: PropsWithChildren<{
	isSlider: boolean;
	options?: Settings
	className?: string;
}>) => {
	return (
		<Slider className={className} dots {...options}>
			{children}
		</Slider>
	);
};

const Stories = () => {
	const { isMobile } = useContext(WindowWidthContext);
	const { newData, updateNewData } = useContext(DataContext);
	const { canEdit } = useContext(UserInfoContext);

	if (!newData) return <></>;

	const deleteComment = (i: number) => {
		const d: NewDataType = {
			...newData,
			common: {
				...newData.common,
				reviews: newData?.common.reviews.filter((_, j) => j !== i),
			}
		};

		updateNewData(d);
	};

	const onAdd = () => {
		const d: NewDataType = {
			...newData,
			common: {
				...newData.common,
				reviews: [...newData?.common.reviews, {
					name: 'Пусто',
					text: 'Пусто',
				}],
			}
		};

		updateNewData(d);
	};

	return isMobile === null ? <></> : (
		<section className={styles.section}>
			<SectionContainer>
				<h2 className={styles.title}>Истории клиентов</h2>
				<DivOrSlider options={{ speed: 0, waitForAnimate: false, infinite: true, slidesPerRow: 1, arrows: false, centerMode: true, centerPadding: '0px' }} isSlider={!!isMobile} className={styles.content}>
					{[...newData?.common.reviews.map(({ name, text }, i) => <div className={styles.cardWrapper}><Comment deleteComment={deleteComment} i={i} name={name} text={text} key={i} /></div>), canEdit && <Button label="Добавить" type={Type.FILLED} onClick={onAdd} />]}
				</DivOrSlider>
			</SectionContainer>
		</section>
	);
};

export default Stories;
