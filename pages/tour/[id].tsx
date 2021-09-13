import Head from 'next/head';
import Hero from '../../sections/Hero';
import mountainImg from '../../assets/img/mountain.jpg';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
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

const cn = getClassNames(styles);

const sections: NavBarItems = [
	[<Link href="/">Главная</Link>, ''],
	['Программа', 'tour_program'],
	['Обо мне', 'tour_me'],
	['Фотографии', 'tour_photo'],
];

const TourInner = () => {
	const router = useRouter();
	const { isMobile } = useContext(WindowWidthContext);
	const [openedIds, setOpenedIds] = useState<string[]>([]);

	const {
		getTourById,
		newData: d,
		// addQA,
		// editQA,
		sendNewData,
		updateNewData,
	} = useContext(DataContext);
	const newData = d as NewDataType;
	const { canEdit, updateValue } = useContext(UserInfoContext);
	const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, newData]) as NewTour;

	const [popup, setPopup] = useState<{
		isOpen: boolean;
		content: null | ReactNode;
	}>({
		isOpen: false,
		content: null
	});

	const updateDay = async (dayIndex: number, type: 'full' | 'short', dType: 'name' | 'description' | 'image', data: string) => {
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((t, i) => {
				if (i === Number(router.query.id)) {
					return {
						...t,
						program: t.program.map((p, j) => {
							if (j === dayIndex) {
								return {
									...p,
									[type]: {
										...p[type],
										[dType]: data,
									}
								}
							}
							return p;
						}),
					}
				}
				return t;
			}),
		};

		updateNewData(d);
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
		};

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

	const deleteLastPicutre = (index: number) => {
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((t, i) => {
				if (i === Number(router.query.id)) {
					return {
						...t,
						lastPictures: t.lastPictures.filter((_, i) => i !== index),
					}
				}
				return t;
			}),
		};

		updateNewData(d);
	};

	const addLastPicture = (base64: string) => {
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((t, i) => {
				if (i === Number(router.query.id)) {
					return {
						...t,
						lastPictures: [...t.lastPictures, base64],
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
		console.log(newData);
		updateNewData(d);
	};

	const popups = useMemo(() => {
		const info = [tour.price, tour.whatIncluded, tour.expenses, newData.common.faq]
		console.log(newData);
		return [
			info[0] && {
				question: 'Какова цена?',
				content: (
					<Price onUpdate={(newPrice: string) => onInfoUpdate('price', newPrice)} onGoClick={() => setPopup({ isOpen: true, content: <BookPopup codeWord={tour.code} onClose={() => setPopup({ ...popup, isOpen: false })} /> })} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какая цена'} text={`Я предлагаю вам незабываемое путешествие, в котором вы  сможете отдонхнуть и т.д. Вообщем надо описать так чтобы еще раз напомнить человеку что за такое не жалко отдать денег.`}
					/>
				)
			},
			info[1] && {
				question: 'Что включено?',
				content: (
					<WhatIncluded onUpdate={(newV: string) => onInfoUpdate('whatIncluded', newV)} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Что включено'} text={'whatIncluded'}
					/>
				),
			},
			info[2] && {
				question: 'Какие расходы?',
				content: (
					<WhatIncluded onUpdate={(newV: string) => onInfoUpdate('expenses', newV)} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какие расходы'} text={`expenses`}
					/>
				),
			},
			info[3] && {
				question: 'Частые вопросы',
				content: (
					<WhatIncluded onUpdate={(newV: string) => onInfoUpdate('faq', newV)} onClose={() => setPopup({ ...popup, isOpen: false })} label={'Какие расходы'} text={`faq`}
					/>
				),
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
				<Button label="Подробнее" onClick={() => { setPopup(prev => ({ content: item.content, isOpen: true })) }} type={Type.OUTLINE} size={Size.LARGE} />
			</div>
		),
		className: cn('cellWrapper'),
		backgroundImage: baikalImg.src,
	}) : {}), [tour, newData, popup]);

	const gi = <Grid title="Дополнительная информация" content={gridProgramContent} />

	// Картинки последнего тура
	const gridContent: Content = (tour.lastPictures || []).slice(0, 4).map((item, i) => ({
		backgroundImage: (() => {
			return item
				? item?.includes('img_')
					? `/api/hello?id=${item}`
					: item
				: ''
		})(),
		child: i === tour.lastPictures.slice(0, 4).length - 1 ? (
			<div className={styles.gridItem}>
				<p>+50 фотографий</p>
				<Button label="Открыть" onClick={() => setPopup(prev => ({ content: popupGallaryContent, isOpen: true }))} size={Size.MEDIUM} type={Type.OUTLINE} />
			</div>
		) : undefined,
		className: styles.gridItem,
		darken: i === tour.lastPictures.slice(0, 4).length - 1,
	}));

	const popupGallaryContent = (
		<Gallery onDeleteImage={(i: number) => deleteLastPicutre(i)} onUpload={(base64: string) => addLastPicture(base64)} onClose={() => setPopup({ ...popup, isOpen: false })} label="Фотографии" imgs={tour.lastPictures} />
	);

	const getProgramFullContent = (index: number) => (
		<div className={`${styles.popupContent} popupContent`}>
			<div className={styles.content}>
				<h3 className={cn('programFullTitle')} style={{ display: 'flex' }}>День {index + 1} - <EditableText iColor="black" onSave={(text: string) => updateDay(index, 'full', 'name', text)}>{tour.program[index].full.name}</EditableText></h3>
				<p className={cn('programFullDescription')}><EditableText iColor="black" onSave={(text: string) => updateDay(index, 'full', 'description', text)}>{tour.program[index].full.description}</EditableText></p>
				<div style={{
					background: `url(${(() => {
						return tour.program[index].full.image
							? tour.program[index].full.image?.includes('img_')
								? `/api/hello?id=${tour.program[index].full.image}`
								: tour.program[index].full.image
							: baikalImg.src
					})()})`,
				}} className={cn('dayImg')} />
				{canEdit && (
					<div style={{ marginTop: 20 }}>
						<UploadImage noButton onUpload={(base64: string) => updateDay(index, 'full', 'image', base64)} />
					</div>
				)}
				<ButtonClose className={styles.buttonClose} onClick={() => { setPopup({ content: null, isOpen: false }) }} />
			</div>
		</div>
	);

	return tour ? (
		<>
			<div style={{
				position: 'fixed',
				top: 0,
				right: 0,
				display: 'grid',
				gridAutoFlow: 'column',
				columnGap: '10px',
				zIndex: 99999999,
			}}>
				<button onClick={() => { sendNewData() }} style={{
					background: 'grey',
					borderRadius: 1,
					fontSize: '14px',
					padding: '4px 5px',
				}}>
					Сохранить все изменения
				</button>
				<button onClick={() => updateValue(!canEdit)} style={{
					background: 'grey',
					borderRadius: 1,
					fontSize: '14px',
					padding: '4px 5px',
				}}>{canEdit ? 'Редактирование' : 'Просмотр'}</button>
			</div>
			<Popup onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))} open={popup.isOpen}>
				{popup.content}
			</Popup>
			<Head>
				<title>Milly adventurer - туры в России</title>
				<meta name="description" content="Туры и экспедиции по России" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Hero backgroundImage={[tour.preview.image
							? tour.preview.image?.includes('img_')
								? `/api/hello?id=${tour.preview.image}`
								: tour.preview.image
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
					<Slider draggable={!canEdit} accessibility={!canEdit} dots speed={0} waitForAnimate={false} centerMode centerPadding={isMobile ? '10px' : '100px'} arrows={false} slidesToShow={1} infinite>
						{[...tour.program.map((day, i) => (
							<article key={i} className={cn('slide')}>
								<div className={cn('slideContainer')} style={{
									background: day.short.image && `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${day.short.image}) center center` || 'black',
								}}>
									<div className={cn('slideTextContainer')}>
										<h3 className={cn('slideTitle')} style={{ display: 'flex' }}>День {i + 1} - <EditableText onSave={(text: string) => updateDay(i, 'short', 'name', text)}>{day.short.name}</EditableText></h3>
										<p className={cn('slideDescription')}><EditableText onSave={(text: string) => updateDay(i, 'short', 'description', text)}>{day.short.description}</EditableText></p>
										<Button className={styles.slideButton} label="Узнать больше" onClick={() => {
											setPopup({ content: getProgramFullContent(i), isOpen: true })
										}} size={Size.MEDIUM} type={Type.OUTLINE} />
										{canEdit && i !== tour.program.length - 1 && (
											<ButtonClose className={styles.delImg} onClick={() => deleteDay(i)} />
										)}
										{canEdit && (
											<div style={{ marginTop: 20 }}>
												<UploadImage noButton onUpload={(base64: string) => updateDay(i, 'short', 'image', base64)} />
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
				</SectionContainer>
			</section>
			<div id="tour_me">
				<Me needPopupButtons={false} />
			</div>
			<div id="tour_photo">
				<Grid content={gridContent} title="Как это было в прошлый раз" />
			</div>
			<div className={styles.storiesSection}><Stories /></div>
			<div id="info">
				{gi}
			</div>
			<div className={styles.book}>
				<Book codeWord={tour.code} />
			</div>
			<Questions />
			<Footer />
		</>
	) : null;
}

const Tour = () => {
	const router = useRouter();
	const { newData, getTourById } = useContext(DataContext);
	const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, newData]);
	
	useEffect(() => {
		if (!tour) {
			router.push('/');
		}
	}, [router.query]);

	return tour ?
		<TourInner />
	: <></>
};

export default Tour;
