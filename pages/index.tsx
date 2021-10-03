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
import React, { ReactNode, useContext, useMemo, useRef } from 'react';
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
import { route } from 'next/dist/next-server/server/router';
import { Router, useRouter } from 'next/dist/client/router';

const cn = getClassNames(styles);

const sections: [ReactNode, string][] = [
	['Мои туры', 'tours'],
	['Обо мне', 'about'],
	['Отзывы клиентов', 'reviews'],
	['Фотографии', 'photos'],
];

const Home = () => {
	const { isMobile, isTablet } = useContext(WindowWidthContext);

	const { newData, updateNewData, sendNewData } = useContext(DataContext);
	const { canEdit, updateValue } = useContext(UserInfoContext);

	const sliderRef = useRef<null | Slider>(null);

	if (!newData) return <></>

	const onUpdateTourInfo = async (tourId: number, type: 'name' | 'description' | 'date' | 'image', data: string) => {
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
				{canEdit && <UploadImage noButton onUpload={(base64: string) => onUpdateTourInfo(i, 'image', base64)} />}
			</>
		),

		backgroundImage: (() => {
			return preview.image
				? preview.image?.includes('img_')
					? `https://milly-back.herokuapp.com/?id=${preview.image}`
					: preview.image
				: homeBg.src
		})(),
		className: styles.cellContainer,
		darken: true,
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

	const router = useRouter();

	const Arrow = (props: any) => {
		console.log(props);
		const { className, style, onClick } = props;
		return (
			<button className={props.className} style={{...props.style, display: 'block', background: 'red', position: 'absolute'}} onClick={props.onClick}>
				{props.left ? '<' : '>'}
			</button>
		)
	};

	const LeftArrow = (props:any) => {
		console.log(props);
		return <Arrow {...props} left={true} />
	}

	const RightArrow = (props:any) => {
		return <Arrow {...props} left={false} />
	}

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
		<button ref={saveRef} className="eb" onClick={() => {
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
		<button className="eb" onClick={() => updateValue(!canEdit)}>{canEdit ? 'Редактирование' : 'Просмотр'}</button>
	</div>
	}

	return (
		<>
			<Head>
				<title>Milly adventurer - туры в России</title>
				<meta name="description" content="Туры и экспедиции по России" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
				{router.query.edit === 'true' && <EditThing />}
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
				<Grid title="Какие путешествия нас ждут?" ds content={toursContent} />
			</div>
			<div id="about">
				<Me />
			</div>
			<section className={cn('slideSection')}>
				<SectionContainer paddings={true}>
					<h2 className={cn('slideSectionTitle')}>Мои душевные авторские <br /> путешествия это:</h2>
					<div className={cn('content')}>
						<Slider ref={sliderRef} autoplay autoplaySpeed={2500} speed={200} dots waitForAnimate={false} arrows={false} centerMode centerPadding={isMobile || isTablet ? '20px' : '300px'} slidesToShow={1} infinite>
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
						<button className={styles.arrowSlider} onClick={sliderRef?.current?.slickPrev || undefined}>
						<svg version="1.1" width="30" height="30" x="0" y="0" viewBox="0 0 492.004 492.004"><g transform="matrix(1,0,0,1,0,-1.1368683772161603e-13)">
							<g xmlns="http://www.w3.org/2000/svg">
								<g>
									<path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#ffffff"/>
								</g>
							</g>
						</g>
						</svg>
						</button>
						<button className={styles.arrowSlider} onClick={sliderRef?.current?.slickNext || undefined}>
						<svg version="1.1" width="30" height="30" x="0" y="0" viewBox="0 0 492.004 492.004"><g transform="matrix(1,0,0,1,0,-1.1368683772161603e-13)">
							<g xmlns="http://www.w3.org/2000/svg">
								<g>
									<path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#ffffff"/>
								</g>
							</g>
						</g>
						</svg>
						</button>
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
