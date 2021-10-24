import Head from 'next/head';
import Hero from '../../sections/Hero';
import mountainImg from '../../assets/img/mountain.jpg';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Button, { Size, Type } from '../../components/Button';
import styles from '../../styles/Tour.module.scss';
import getClassNames from '../../helpers/classNames';
import SectionContainer from '../../components/SectionContainer';
import { useContext } from 'react';
import { WindowWidthContext } from '../../contexts/WindowWidth';
import Slider from 'react-slick';
import Link from 'next/link';
import Me from '../../sections/Me';
import Stories from '../../sections/Stories';
import Grid, { Content } from '../../sections/Grid';
import baikalImg from '../../assets/img/baikal.jpg';
// import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import Book from '../../sections/Book';
import Questions from '../../sections/Questions';
import Footer from '../../sections/Footer';
import Popup from '../../components/Popup';
import Gallery from '../../components/Popup/Gallery';
import { NavBarItems } from '../../components/NavBar';
import { Link as ScrollLink } from 'react-scroll';
import { DataContext } from '../../contexts/Data';
import router, { useRouter } from 'next/dist/client/router';

import EditableText from '../../components/EditableText';
import { UserInfoContext } from '../../contexts/UserInfo';
import UploadImage from '../../components/UploadImage';
import ButtonClose from '../../components/ButtonClose';
import WhatIncluded from '../../components/Popup/WhatIncluded';
import Price from '../../components/Popup/Price';
import BookPopup from '../../components/Popup/Book';
import { NewData as NewDataType, NewTour } from '../../interfaces/Tour';
import ProgramFull from '../../components/ProgramFull';

import q1 from '../../assets/img/q-1.jpg';
import q2 from '../../assets/img/q-2.jpg';
import q3 from '../../assets/img/q-3.jpg';
import q4 from '../../assets/img/q-4.jpg';

const cn = getClassNames(styles);

const sections: NavBarItems = [
	[<Link href="/">Главная</Link>, ''],
	['Программа', 'tour_program'],
	['Обо мне', 'tour_me'],
	['Фотографии', 'tour_photo'],
];

const TourInner = () => {
	const router = useRouter();
	const { isMobile, isTablet } = useContext(WindowWidthContext);
	const sliderRef = useRef<null | Slider>(null);

	const {
		getTourById,
		newData,
		sendNewData,
		updateNewData,
		updateDay,
		setData,
	} = useContext(DataContext) as { newData: NewDataType, [key: string]: any };
	const { canEdit, updateValue } = useContext(UserInfoContext);
	const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, newData]) as NewTour;
	// const isLastOpen = useRef(false);
	useEffect(() => {
		console.log(newData.tours[2].lastPictures, 'come back', tour.lastPictures);
	}, [newData]);
	const [popup, updatePopup] = useState<{
		isOpen: boolean;
		content: null | ReactNode;
	}>({
		isOpen: false,
		content: null
	});

	const setPopup = (d: {
		isOpen: boolean;
		content: null | ReactNode;
	}) => {
		// isLastOpen.current = d.isOpen || isLastOpen.current;
		updatePopup(d);
	};

	const deleteDay = (dayIndex: number) => {
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((t, i) => {
				if (i === Number(router.query.id)) {
					return {
						...t,
						program: t.program.filter((_, i) => dayIndex !== i),
					}
				}
				return t;
			}),
		}

		updateNewData(d);
	};

	const addDay = () => {
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((t, i) => {
				if (i === Number(router.query.id)) {
					return {
						...t,
						program: [...t.program, {
							day: t.program.length,
							full: {
								description: 'Описание',
								name: 'Заголовок',
								image: null,
							},
							short: {
								description: 'Описание',
								name: 'Заголовок',
								image: null,
							}
						}],
					}
				}
				return t;
			}),
		};

		updateNewData(d);
	};

	const deleteLastPicutre = useMemo(() => (index: number, last: string[]) => {
		console.log('delete', index);
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((t, i) => {
				if (i === Number(router.query.id)) {
					console.log(t.lastPictures, index, 'what the hell');
					return {
						...t,
						lastPictures: last.filter((_, j) => j !== index),
					}
				}
				return t;
			}),
		};
		updateNewData(d);
	}, [tour, newData]);

	const addLastPicture = (base64: any) => {
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((t, i) => {
				if (i === Number(router.query.id)) {
					console.log(t.lastPictures, base64, 'kasdf;lkasjfdjk');
					return {
						...t,
						lastPictures: base64,
					}
				}
				return t;
			}),
		};
		updateNewData(d);
	};

	const onInfoUpdate = (type: 'price' | 'whatIncluded' | 'expenses' | 'faq', data: string) => {
		const d: NewDataType = {
			...newData,
			common: {
				...newData.common,
				faq: type === 'faq' ? data : newData.common.faq,
			},
			tours: newData.tours.map((t, i) => {
				if (Number(router.query.id) === i) {
					return {
						...t,
						[type]: data,
					}
				}
				return t;
			}),
		};
		updateNewData(d);
	};

	const popups = useMemo(() => {
		const info = [tour.price, tour.whatIncluded, tour.expenses, newData.common.faq]
		return [
			info[0] && {
				question: 'Какова цена?',
				content: (
					<Price onUpdate={(newPrice: string) => onInfoUpdate('price', newPrice)} onGoClick={() => setPopup({ isOpen: true, content: <BookPopup codeWord={tour.code} onClose={() => setPopup({ ...popup, isOpen: false })} /> })} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какая цена'} text={`Я предлагаю вам незабываемое путешествие, которое навсегда останется в вашей памяти и будет греть вашу душу зимними вечерами.`}
					/>
				),
				img: q1.src,
			},
			info[1] && {
				question: 'Что включено?',
				content: (
					<WhatIncluded onUpdate={(newV: string) => onInfoUpdate('whatIncluded', newV)} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Что включено'} text={'whatIncluded'}
					/>
				),
				img: q2.src,
			},
			info[2] && {
				question: 'Какие расходы?',
				content: (
					<WhatIncluded onUpdate={(newV: string) => onInfoUpdate('expenses', newV)} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какие расходы'} text={`expenses`}
					/>
				),
				img: q3.src,
			},
			info[3] && {
				question: 'Частые вопросы',
				content: (
					<WhatIncluded onUpdate={(newV: string) => onInfoUpdate('faq', newV)} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Частые вопросы'} text={`faq`}
					/>
				),
				img: q4.src,
			}
		]
	}, [tour, newData, popup]);

	// Дополнительная информация
	const gridProgramContent: Content = useMemo(() => popups.map((item, i) => item ? ({
		darken: true,
		child: (
			<div className={cn('cell')}>
				<strong className={cn('cellTitle')}>
					{item.question}
				</strong>
				<Button label="Подробнее" onClick={() => { setPopup({ content: item.content, isOpen: true }) }} type={Type.OUTLINE} size={Size.LARGE} />
			</div>
		),
		className: cn('cellWrapper'),
		backgroundImage: item.img,
	}) : {}), [tour, newData, popup]);

	const gi = <Grid title="Дополнительная информация" content={gridProgramContent} />

	// Картинки последнего тура
	const gridContent: Content = (tour.lastPictures || []).slice(0, 4).map((item, i) => ({
			backgroundImage: (() => {
				return item
					? `https://imagedelivery.net/mJnGC39eOdMDhMEQde3rlw/${item}/public`
					: 'grey'
			})(),
			child: i === tour.lastPictures.slice(0, 4).length - 1  ? (
				<div className={styles.gridItem}>
					<p>+{tour.lastPictures.length} фотографий</p>
					<Button label="Открыть" onClick={() => setPopup({ content: <Gallery type="lastP" onDeleteImage={(i: number, last: string[]) => deleteLastPicutre(i, last)} onUpload={(base64: string) => addLastPicture(base64)} onClose={() => setPopup({ ...popup, isOpen: false })} label="Фотографии" imgs={tour.lastPictures} />, isOpen: true })} size={Size.MEDIUM} type={Type.OUTLINE} />
				</div>
			) : undefined,
			className: styles.gridItem,
			darken: i === tour.lastPictures.slice(0, 4).length - 1,
		}))

	const setProgram = (i: number) => {
		setPopup({ content: <ProgramFull setPopup={setPopup} index={i} />, isOpen: true });
	};

	const EditThing = () => {
		const saveRef = useRef(null);
		return <div style={{
			position: 'fixed',
			top: 0,
			left: 5,
			display: 'grid',
			gridAutoFlow: 'column',
			columnGap: '5px',
			zIndex: 99999999,
		}}>
			<strong  className="eb" style={{ display: 'grid', gridAutoFlow: 'column', columnGap: '5px', padding: '6px 19px' }}>Кодовое слово: <EditableText onSave={(t) => {
				updateNewData({
					...newData,
					tours: newData.tours.map((to, j) => j === Number(router.query.id) ? ({
						...to,
						code: t,
					}) : to)
				})
			}}>{tour.code}</EditableText></strong>
			<button 					style={{					zIndex: 999999999}} ref={saveRef} className="eb" onClick={() => {
				sendNewData();
				if (saveRef.current) {
					// @ts-ignore
					saveRef.current.textContent = 'Сохранение на сервер...';
				}
				setTimeout(() => {
					if (saveRef.current) {
						// @ts-ignore
						saveRef.current.textContent = 'Успешно сохранено';
					}
				}, 4000);
				setTimeout(() => {
					if (saveRef.current) {
						// @ts-ignore
						saveRef.current.textContent = 'Сохранить все изменения';
					}
				}, 6000);
			}}>
				Сохранить все изменения
			</button>
			<button 					style={{zIndex: 999999999}} className="eb" onClick={() => updateValue(!canEdit)}>{canEdit ? 'Редактирование' : 'Просмотр'}</button>
		</div>
	}

	return tour ? (
		<>
			{!isMobile && router.query.edit === 'a3JiVn2mj' && <EditThing />}
			<Popup onClose={() => setPopup({ ...popup, isOpen: false })} open={popup.isOpen}>
				{popup.content}
			</Popup>
			<Head>
				<title>Milly adventurer - туры в России</title>
				<meta name="description" content="Туры и экспедиции по России" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Hero ds backgroundImage={[tour.preview.image
				? `https://imagedelivery.net/mJnGC39eOdMDhMEQde3rlw/${tour.preview.image}/public`
				: baikalImg.src]} navBarItems={sections}>
				<div>
					<small className={cn('date')} dangerouslySetInnerHTML={{ __html: tour.preview.date }} />
					<h3 className={cn('title')} dangerouslySetInnerHTML={{ __html: tour.preview.name }} />
					<p className={cn('desc')} dangerouslySetInnerHTML={{ __html: tour.preview.description }} />
					<ScrollLink to="tour_program" spy smooth color="white">
						<Button className={styles.cellButton} label="Отправиться в путешествие" onClick={() => { }} type={Type.FILLED} size={Size.LARGE} />
					</ScrollLink>
				</div>
			</Hero>
			<section id="tour_program" className={cn('sliderSection')}>
				<SectionContainer paddings={true}>
					<h2 className={cn('sliderSectionTitle')}>Куда же мы отправимся?</h2>
					<div className={styles.sliderContent}>
						<Slider ref={sliderRef} draggable={!canEdit} accessibility={!canEdit} dots autoplay={isMobile ? false : true}
							autoplaySpeed={2500}
							speed={200}
							waitForAnimate={false}
							arrows={false} centerMode centerPadding={isMobile || isTablet ? '10px' : '200px'} slidesToShow={1} infinite>
							{[...tour.program.map((day, i) => (
								<article key={i} className={cn('slide')}>
									<div className={cn('slideContainer')} style={{
										background: day.short.image && `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${day.short.image
											? `https://imagedelivery.net/mJnGC39eOdMDhMEQde3rlw/${day.short.image}/public`
											: baikalImg.src}) center center` || 'black',
									}}>
										<div className={cn('slideTextContainer')}>
											<h3 className={cn('slideTitle')} style={{ display: 'flex' }}>День {i + 1} - <EditableText onSave={(text: string) => updateDay(i, 'short', 'name', text, Number(router.query.id))}>{day.short.name}</EditableText></h3>
											<p className={cn('slideDescription')}><EditableText onSave={(text: string) => updateDay(i, 'short', 'description', text, Number(router.query.id))}>{day.short.description}</EditableText></p>
											<Button className={styles.slideButton} label="Узнать больше" onClick={() => setProgram(i)} size={Size.MEDIUM} type={Type.OUTLINE} />
											{canEdit && tour.program.length > 1 && (
												<ButtonClose className={styles.delImg} onClick={() => deleteDay(i)} />
											)}
											{canEdit && (
												<div style={{ marginTop: 20 }}>
													<UploadImage noButton onUpload={(base64: string) => updateDay(i, 'short', 'image', base64, Number(router.query.id))} />
												</div>
											)}
										</div>
									</div>
								</article>
							)), canEdit && <article className={cn('slide')}>
								<div className={cn('slideContainer')} style={{
									background: 'black',
								}}>
									<div className={cn('slideTextContainer')}>
										<div style={{ marginTop: 50, margin: '50px auto' }}>
											<Button onClick={() => addDay()} label="Добавить день" />
										</div>
									</div>
								</div>
							</article>
							]}
						</Slider>
						{isMobile && (
						<>
						<button
							className={styles.arrowSlider}
							onClick={sliderRef?.current?.slickPrev || undefined}
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
							onClick={sliderRef?.current?.slickNext || undefined}
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
					</>
				)}
					</div>

				</SectionContainer>
			</section>
			<div id="tour_me">
				<Me needPopupButtons={false} />
			</div>
			<div id="tour_photo">
				<Grid isTour={true} content={gridContent} title="Как это было в прошлый раз" />
			</div>
			<div className={styles.storiesSection}><Stories /></div>
			<div id="info">
				{gi}
			</div>
			<div className={styles.book}>
				<Book codeWord={tour.code} />
			</div>
			{/* <Questions /> */}
			<Footer />
		</>
	) : null;
}

const Tour = () => {
	const router = useRouter();
	const { newData, getTourById } = useContext(DataContext);
	const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, newData]);

	return tour ?
		<TourInner />
		: <></>
};

export default Tour;
