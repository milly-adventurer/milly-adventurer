import Head from "next/head";
import Image from "next/image";

import Hero from "../sections/Hero";

import homeBg from "../assets/img/home-bg.jpg";
import logo from "../assets/img/logo.png";
import slide1 from "../assets/img/slide_0.jpg";
import slide2 from "../assets/img/slide_2.jpg";
import slide3 from "../assets/img/slide_3.jpg";
import slide4 from "../assets/img/slide_4.jpg";

import styles from "../styles/Home.module.scss";
import Button, {Size, Type} from "../components/Button";
import Grid from "../sections/Grid";
import getClassNames from "../helpers/classNames";
import React, {ReactNode, useContext, useRef} from "react";
import Me from "../sections/Me";
import SectionContainer from "../components/SectionContainer";

import Slider from "react-slick";
import Stories from "../sections/Stories";
import Tabs from "../sections/Tabs";
import Questions from "../sections/Questions";
import {WindowWidthContext} from "../contexts/WindowWidth";
import NextLink from "next/link";
import Footer from "../sections/Footer";
import {Link} from "react-scroll";
import {DataContext} from "../contexts/Data";
import EditableText from "../components/EditableText";
import heroSpring1 from "../assets/img/hero_spring_1.jpg";
import heroSpring2 from "../assets/img/hero_spring_2.jpg";
import heroSpring3 from "../assets/img/hero_spring_3.jpg";
import heroSpring4 from "../assets/img/hero_spring_4.jpg";
import heroSpring5 from "../assets/img/hero_spring_5.jpg";
import {NewData as NewDataType} from "../interfaces/Tour";
import {UserInfoContext} from "../contexts/UserInfo";
import UploadImage from "../components/UploadImage";
import {useRouter} from "next/dist/client/router";
import ButtonClose from "../components/ButtonClose";
import {GetServerSidePropsContext} from "next";
import {BASE_URL, URL} from "../constants/url";

const cn = getClassNames(styles);

enum SectionId {
    TOURS = 'tours',
    ABOUT = 'about',
    REVIEWS = 'reviews',
    PHOTOS = 'photos',
    QA = 'qa',
}

const sections: [ReactNode, SectionId][] = [
    ["Мои туры", SectionId.TOURS],
    ["Обо мне", SectionId.ABOUT],
    ["Отзывы клиентов", SectionId.REVIEWS],
    ["Фотографии", SectionId.PHOTOS],
];

const Home = () => {

    const {isMobile, isTablet} = useContext(WindowWidthContext);

    const {updateNewData, sendNewData, newData} = useContext(DataContext);

    const {canEdit, updateValue} = useContext(UserInfoContext);

    const sliderRef = useRef<null | Slider>(null);

    const router = useRouter();

    if (!newData) return <></>;

    const onUpdateTourInfo = async (
        tourId: number,
        type: "name" | "description" | "date" | "image",
        data: string
    ) => {
        const d: NewDataType = {
            ...newData,
            tours: newData.tours.map((tour, i) => {
                if (i === tourId) {
                    return {
                        ...tour,
                        preview: {
                            ...tour.preview,
                            name: type === "name" ? data : tour.preview.name,
                            description:
                                type === "description" ? data : tour.preview.description,
                            date: type === "date" ? data : tour.preview.date,
                            image: type === "image" ? data : tour.preview.image,
                        },
                    };
                }

                return tour;
            }),
        };

        updateNewData(d);
    };

    const deleteTrip = (i: number) => {
        const d: NewDataType = {
            ...newData,
            tours: newData.tours.filter((_, index) => index !== i),
        };

        updateNewData(d);
    };

    const toursContent = newData.tours.map(({preview}, i) => ({
        child: (
            <>
                {canEdit && <ButtonClose className={styles.deleteTrip} width={20} height={20} onClick={() => {
                    const result = confirm('Вы уверены, что хотите удалить тур?');
                    if (result) {
                        deleteTrip(i)
                    }
                }}/>}
                <small className={cn("cellDate")}>
                    <EditableText
                        onSave={(text: string) => onUpdateTourInfo(i, "date", text)}
                    >
                        {preview.date}
                    </EditableText>
                </small>
                <h3 className={cn("cellTitle")}>
                    <EditableText
                        onSave={(text: string) => onUpdateTourInfo(i, "name", text)}
                    >
                        {preview.name}
                    </EditableText>
                </h3>
                <p className={cn("cellDescription")}>
                    <EditableText
                        onSave={(text: string) => onUpdateTourInfo(i, "description", text)}
                    >
                        {preview.description}
                    </EditableText>
                </p>
                <NextLink href={`/tour/${i}${router.query.edit === "a3JiVn2mj" ? '?edit=a3JiVn2mj' : ''}`}>
                    <a>
                        <Button
                            className={styles.cellButton}
                            label="Узнать больше"
                            onClick={() => {
                            }}
                            type={Type.OUTLINE}
                            size={Size.LARGE}
                        />
                    </a>
                </NextLink>
                {canEdit && (
                    <UploadImage
                        noButton
                        onUpload={(base64: string) => onUpdateTourInfo(i, "image", base64)}
                    />
                )}
            </>
        ),

        backgroundImage: (() => {
            return preview.image
                ? `https://imagedelivery.net/mJnGC39eOdMDhMEQde3rlw/${preview.image}/public`
                : homeBg.src;
        })(),
        className: styles.cellContainer,
        darken: true,
    }));

    const aboutTours = [
        {
            title:
                "Всегда небольшие группы и трепетная забота о каждом госте.",
            description:
                "В моих мини-группах от 5 до 10 человек. Для меня очень важно уделить каждому гостю максимум внимания и подарить ощущение комфорта, безопасности и спокойствия.",
            img: slide1.src,
            pos: {x: 'bottom'}
        },
        {
            title: "Творческий подход к путешествию и спокойный расслабленный темп.",
            description:
                "В моих турах я создаю аутентичную атмосферу того места, где мы находимся через общение с местными жителями, их рассказы, истории и традиции.",
            img: slide2.src,
        },
        {
            title: "Безупречная организация и комфорт.",
            description:
                "Беру все вопросы логистики, планирования и тайминга на себя. Вам остаётся только расслабиться и настроиться на потрясающее путешествие.",
            img: slide3.src,
            pos: {x: 'bottom'}
        },
        {
            title: "Эксклюзивные и лично проверенные маршруты.",
            description:
                "Все маршруты, отели, кафе и рестораны я проверяю самостоятельно, поэтому возможность непредвиденных ситуаций сведена к минимуму.",
            img: slide4.src,
            pos: {x: 'bottom'}
        },
    ];

    const onSeeToursClick = () => {
    };

    const EditThing = () => {
        const saveRef = useRef(null);
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 5,
                    display: "grid",
                    gridAutoFlow: "column",
                    columnGap: "5px",
                    zIndex: 999999999,
                }}
            >
                <button
                    ref={saveRef}
                    style={{zIndex: 999999999}}
                    className="eb"
                    onClick={() => {
                        sendNewData();
                        if (saveRef.current) {
                            // @ts-ignore
                            saveRef.current.textContent = "Сохранение на сервер...";
                        }

                        setTimeout(() => {
                            if (saveRef.current) {
                                // @ts-ignore
                                saveRef.current.textContent = "Успешно сохранено";
                            }
                        }, 4000);
                        setTimeout(() => {
                            if (saveRef.current) {
                                // @ts-ignore
                                saveRef.current.textContent = "Сохранить все изменения";
                            }
                        }, 6000);
                    }}
                >
                    Сохранить все изменения
                </button>
                <button style={{zIndex: 999999999}} className="eb" onClick={() => updateValue(!canEdit)}>
                    {canEdit ? "Редактирование" : "Просмотр"}
                </button>
            </div>
        );
    };

    const createNewTrip = () => {
        console.log(newData, 'db')
        const d: NewDataType = {
            ...newData,
            tours: [...newData.tours, {
                code: 'Пусто',
                expenses: '-',
                faq: '-',
                lastPictures: [''],
                qaSectionPics: [],
                reviews: newData.common.reviews,
                preview: {
                    date: 'Дата',
                    description: 'Описание',
                    image: null,
                    name: 'Название',
                },
                price: '-',
                program: [{
                    day: 1,
                    full: {
                        description: 'Опсиание',
                        image: null,
                        name: 'Название',
                    },
                    short: {
                        description: 'Опсиание',
                        image: null,
                        name: 'Название',
                    }
                }],
                whatIncluded: '-',
            },
            ],
        };
        console.log(d, 'da')
        updateNewData(d);
    };

    return (
        <>
            <Head>
                <meta name="language" content="ru"/>
                <title>Milly adventurer - авторские туры в России</title>
                <meta name="description" content="Туры и экспедиции по России"/>
                <meta name="title" content="Milly adventurer - авторские туры в России"/>
                <meta name="url" content="https://milly-adventurer.ru"/>
                <meta name="copyright" content="Milly Adventurer"/>
                <meta name="robots" content="index,follow"/>
                <meta property="og:type" content="website"/>
                <meta property="og:locale" content="ru_ru"/>
                <meta property="og:url" content="https://milly-adventurer.ru"/>
                <meta property="og:title" content="Milly adventurer - авторские туры в России"/>
                <meta property="og:description" content="Milly adventurer - авторские туры в России"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {router.query.edit === "a3JiVn2mj" && <EditThing/>}
            <Hero
                backgroundImage={[
                    heroSpring1.src,
                    heroSpring2.src,
                    heroSpring3.src,
                    heroSpring4.src,
                    heroSpring5.src,
                ]}
                navBarItems={sections}
            >
                <div className={styles.logo}>
                    <Image src={logo} alt="Logo"/>
                </div>
                <h1 className={styles.title}>
                    Индивидуальные туры и экскурсии по Горному Алтаю
                </h1>
                <Link to="tours" spy smooth color="white">
                    <Button
                        onClick={onSeeToursClick}
                        label="Посмотреть туры"
                        size={Size.LARGE}
                    />
                </Link>
            </Hero>
            <div id={SectionId.TOURS}>
                <Grid title="Какие путешествия нас ждут?" ds content={[...toursContent, canEdit ? {
                    child: (
                        <button onClick={createNewTrip} style={{
                            fontSize: 80,
                            display: 'grid',
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            +
                        </button>
                    ),
                    backgroundImage: '',
                    darken: true,
                    darkPercent: 0.7,
                    className: styles.tourCard,
                } : {}]}/>
            </div>
            <div id={SectionId.ABOUT}>
                <Me/>
            </div>
            <section className={cn("slideSection")}>
                <SectionContainer paddings={true}>
                    <h2 className={cn("slideSectionTitle")}>
                        Мои душевные авторские <br/> путешествия это:
                    </h2>
                    <div className={cn("content")}>
                        <Slider
                            ref={sliderRef}
                            autoplay={isMobile || canEdit ? false : true}
                            autoplaySpeed={2500}
                            swipe={!canEdit}
                            speed={200}
                            dots
                            waitForAnimate={false}
                            arrows={false}
                            centerMode
                            centerPadding={isMobile || isTablet ? "20px" : "300px"}
                            slidesToShow={1}
                            infinite
                        >
                            {aboutTours.map(({title, description, img, pos}, i) => (
                                <article key={i} className={cn("slide")}>
                                    <div
                                        style={{
                                            background: `url(${img}) ${pos?.x || ''}`,
                                        }}
                                        className={cn("slideImg")}
                                    ></div>
                                    <div className={cn("slideTextContainer")}>
                                        <p className={cn("slideTitle")}>{title}</p>
                                        <p className={cn("slideDescription")}>{description}</p>
                                    </div>
                                </article>
                            ))}
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
            <div id={SectionId.ABOUT}>
                <Tabs/>
            </div>
            <div className={styles.storiesSection} id={SectionId.REVIEWS}>
                <Stories/>
            </div>
            <div id="qa">
                <Questions/>
            </div>
            <Footer/>
        </>
    );
};

export default Home;
