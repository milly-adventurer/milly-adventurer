import SectionContainer from '../../components/SectionContainer';
import styles from './Stories.module.scss';

import { PropsWithChildren, useContext, useRef } from 'react';
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
	const { isMobile } = useContext(WindowWidthContext);
	const sliderRef = useRef<null | Slider>(null);
	return (
		<div className={styles.sliderContent}>
			<Slider ref={sliderRef} className={className} dots {...options}>
				{children}
			</Slider>
					<button
						className={styles.arrowSlider}
						onClick={() => { sliderRef?.current?.slickPrev() || undefined}}
					>
						<svg
							version="1.1"
							width="30"
							height="30"
							x="0"
							y="0"
							viewBox="0 0 492.004 492.004"
						>
							<g transform="matrix(1,0,0,1,0,-1.1368683772161603e-13)">
								<g xmlns="http://www.w3.org/2000/svg">
									<g>
										<path
											d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
											fill="#ffffff"
										/>
									</g>
								</g>
							</g>
						</svg>
					</button>
					<button
						className={styles.arrowSlider}
						onClick={() => {sliderRef?.current?.slickNext() || undefined}}
					>
						<svg
							version="1.1"
							width="30"
							height="30"
							x="0"
							y="0"
							viewBox="0 0 492.004 492.004"
						>
							<g transform="matrix(1,0,0,1,0,-1.1368683772161603e-13)">
								<g xmlns="http://www.w3.org/2000/svg">
									<g>
										<path
											d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
											fill="#ffffff"
										/>
									</g>
								</g>
							</g>
						</svg>
					</button>
		</div>
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
				<DivOrSlider options={{ autoplay: isMobile || canEdit ? false : true,
					swipe: !canEdit,
							autoplaySpeed: 2500,
							speed: 200, waitForAnimate: false, infinite: true, slidesPerRow: 1, arrows: false, centerMode: true, centerPadding: '0px' }} isSlider={!!isMobile} className={styles.content}>
					{[...newData?.common.reviews.map(({ name, text }, i) => <div className={styles.cardWrapper}><Comment deleteComment={deleteComment} i={i} name={name} text={text} key={i} /></div>), canEdit && <div className={styles.cardWrapper}><Button label="Добавить" className={styles.addNewSmth} type={Type.FILLED} onClick={onAdd} /></div>]}
				</DivOrSlider>
			</SectionContainer>
		</section>
	);
};

export default Stories;
