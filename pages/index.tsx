import Head from 'next/head';
import Image from 'next/image';

import Hero from '../sections/Hero';

import homeBg from '../assets/img/home-bg.jpg';
import logo from '../assets/img/logo.png';
import cellBg from '../assets/img/cell-del.jpg';
import cell2Bg from '../assets/img/cell-2-del.jpg';
import cell3Bg from '../assets/img/cell-3-del.jpg';
import millyBg from '../assets/img/milly.jpg';
import slide2 from '../assets/img/slide_2.png';
import slide3 from '../assets/img/slide_3.png';
import slide4 from '../assets/img/slide_4.png';

import styles from '../styles/Home.module.scss';
import Button, { Size, Type } from '../components/Button';
import Grid, { Content } from '../sections/Grid';
import getClassNames from '../helpers/classNames';
import React, { ReactNode, useContext, useMemo } from 'react';
import Me from '../sections/Me';
import SectionContainer from '../components/SectionContainer';

import Slider from 'react-slick';
import Stories from '../sections/Stories';
import Tabs from '../sections/Tabs';
import Questions from '../sections/Questions';
import { WindowWidthContext } from '../contexts/WindowWidth';
import NextLink from 'next/link';
import Footer from '../sections/Footer';
import { Link } from 'react-scroll';
import { DataContext } from '../contexts/Data';
import EditableText from '../components/EditableText';
import heroslide2 from '../assets/img/home-slide-3.jpg';
import heroSlide3 from '../assets/img/home-slide-4.jpg';
import { NewData as NewDataType } from '../interfaces/Tour';
import { UserInfoContext } from '../contexts/UserInfo';
import UploadImage from '../components/UploadImage';

const cn = getClassNames(styles);

const sections: [ReactNode, string][] = [
	['Мои туры', 'tours'],
	['Обо мне', 'about'],
	['Отзывы клиентов', 'reviews'],
	['Фотографии', 'photos'],
];

const bgs = [cellBg, cell2Bg, cell3Bg, cell2Bg];

const Home = () => {
	const { isMobile, isTablet } = useContext(WindowWidthContext);

	const { data, newData, updateNewData, sendNewData } = useContext(DataContext);
	const { canEdit, updateValue } = useContext(UserInfoContext);
	console.log(canEdit, 'can');
	if (!newData || !data) return <></>

	const onUpdateTourInfo = async (tourId: number, type: 'name' | 'description' | 'date' | 'image', data: string) => {
		console.log('updae')
		const d: NewDataType = {
			...newData,
			tours: newData.tours.map((tour, i) => {
				if (i === tourId) {
					return {
						...tour,
						preview: {
							...tour.preview,
							name: type === 'name' ? data : tour.preview.name,
							description: type === 'description' ? data : tour.preview.description,
							date: type === 'date' ? data : tour.preview.date,
							image: type === 'image' ? data : tour.preview.image,
						}
					}
				}

				return tour;
			}),
		};

		updateNewData(d);
	};

	const toursContent = newData.tours.map(({ preview }, i) => ({
		child: (
			<>
				<small className={cn('cellDate')}><EditableText onSave={(text: string) => onUpdateTourInfo(i, 'date', text)}>{preview.date}</EditableText></small>
				<h3 className={cn('cellTitle')}><EditableText onSave={(text: string) => onUpdateTourInfo(i, 'name', text)}>{preview.name}</EditableText></h3>
				<p className={cn('cellDescription')}><EditableText onSave={(text: string) => onUpdateTourInfo(i, 'description', text)}>{preview.description}</EditableText></p>
				<NextLink href={`/tour/${i}`}>
					<a>
						<Button className={styles.cellButton} label="Узнать больше" onClick={() => { }} type={Type.OUTLINE} size={Size.LARGE} />
					</a>
				</NextLink>
				{<UploadImage noButton onUpload={(base64: string) => onUpdateTourInfo(i, 'image', base64)} />}
			</>
		),

		backgroundImage: (() => {
			return preview.image
			? preview.image?.includes('img_')
				? `/api/hello?id=${preview.image}`
				: preview.image
			: homeBg.src
		})(),
		className: styles.cellContainer,
	}));

	const aboutTours = [{
		title: 'Всегда небольшие группы из 6 человек и трепетная забота о каждом госте',
		description: 'Организовала отдых тысячам довольных туристов, которые из года в год снова обращаются ко мне за подбором тура.',
		img: millyBg.src,
	},
	{
		title: 'Творческий подход к путешествию и спокойный, расслабленный темп',
		description: 'В турах я создаю аутентичную атмосферу того места где мы находимся. Через общение с местными, их рассказы, истории и т.д. Все это создает невероятную и уникальную атмосферу.',
		img: slide2.src,
	},
	{
		title: 'Безупречная организация и комфорт',
		description: 'Беру все сложности логистики на себя. Вам остается только расслабиться и настроиться на потрясающее путешествие.',
		img: slide3.src,
	},
	{
		title: 'Эксклюзивные и лично проверенные маршруты',
		description: 'Все маршруты и отели я проверяю самостоятельно. Так что возможность каких-то казусов сведена к минимуму.',
		img: slide4.src,
	}];

	const onSeeToursClick = () => {

	};

	return (
		<>
			<Head>
				<title>Milly adventurer - туры в России</title>
				<meta name="description" content="Туры и экспедиции по России" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
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
			<Hero backgroundImage={[homeBg.src, heroslide2.src, heroSlide3.src]} navBarItems={sections}>
				<div className={styles.logo}>
					<Image src={logo} alt="Logo" />
				</div>
				<h1 className={styles.title}>Душевные авторские туры и экспедиции по России</h1>
				<Link to="tours" spy smooth color="white">
					<Button onClick={onSeeToursClick} label="Посмотреть туры" size={Size.LARGE} />
				</Link>
			</Hero>
			<div id="tours">
				<Grid title="Мои авторские туры" content={toursContent} />
			</div>
			<div id="about">
				<Me />
			</div>
			<section className={cn('slideSection')}>
				<SectionContainer paddings={true}>
					<h2 className={cn('slideSectionTitle')}>Мои душевные авторские <br /> путешествия это:</h2>
					<div className={cn('content')}>
						<Slider speed={200} dots waitForAnimate={false} arrows={false} centerMode centerPadding={isMobile ? '20px' : isTablet ? '50px' : '300px'} slidesToShow={1} infinite>
							{aboutTours.map(({ title, description, img }, i) => (
								<article key={i} className={cn('slide')}>
									<div style={{
										background: `url(${img})`,
									}} className={cn('slideImg')}>
									</div>
									<div className={cn('slideTextContainer')}>
										<p className={cn('slideTitle')}>{title}</p>
										<p className={cn('slideDescription')}>{description}</p>
									</div>
								</article>
							))}
						</Slider>
					</div>
				</SectionContainer>
			</section>
			<div id="photos">
				<Tabs />
			</div>
			<div className={styles.storiesSection} id="reviews">
				<Stories />
			</div>
			<div id="qa">
				<Questions />
			</div>
			<Footer />
		</>
	);
};

export default Home;
function setCanEdit(arg0: boolean): void {
	throw new Error('Function not implemented.');
}

