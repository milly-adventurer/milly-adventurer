import { useRouter } from "next/dist/client/router";
import React, { useContext, useMemo } from "react";
import { DataContext } from "../../contexts/Data";
import { UserInfoContext } from "../../contexts/UserInfo";
import { NewTour } from "../../interfaces/Tour";
import ButtonClose from "../ButtonClose";
import EditableText from "../EditableText";
import UploadImage from "../UploadImage";
import baikalImg from '../../assets/img/baikal.jpg';

import styles from './ProgramFull.module.scss';

const ProgramFull = ({ index, setPopup, }: { index: number, setPopup: any }) => {
	const router = useRouter();
	const { newData, updateDay, getTourById } = useContext(DataContext);
	const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, newData]) as NewTour;
	const { canEdit } = useContext(UserInfoContext);

	return (
		<div className={`${styles.popupContent} popupContent`}>
			<div className={styles.content}>
				<h3 className={styles.programFullTitle} style={{ display: 'flex', flexWrap: 'wrap' }}>День {index + 1} - <EditableText iColor="black" onSave={(text: string) => updateDay(index, 'full', 'name', text, Number(router.query.id))}>{tour.program[index].full.name}</EditableText></h3>
				<p className={styles.programFullDescription}><EditableText iColor="black" onSave={(text: string) => updateDay(index, 'full', 'description', text, Number(router.query.id))}>{tour.program[index].full.description}</EditableText></p>
				<div style={{
					background: `url(${(() => {
						return tour.program[index].full.image
							? `https://imagedelivery.net/BjEATObSzIqdwKoVD4rQRw/${tour.program[index].full.image}/public`
							: baikalImg.src
					})()})`,
				}} className={styles.dayImg} />
				{canEdit && (
					<div style={{ marginTop: 20 }}>
						<UploadImage noButton onUpload={(base64: string) => updateDay(index, 'full', 'image', base64, Number(router.query.id))} />
					</div>
				)}
				<ButtonClose className={styles.buttonClose} onClick={() => { setPopup({ content: null, isOpen: false }) }} />
			</div>
		</div>
	);
};

export default ProgramFull;
function getTourById(arg0: number): any {
	throw new Error("Function not implemented.");
}

