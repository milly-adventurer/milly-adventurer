import router from 'next/dist/client/router';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../../contexts/Data';
import { UserInfoContext } from '../../../contexts/UserInfo';
import { NewTour } from '../../../interfaces/Tour';
import ButtonClose from '../../ButtonClose';
import EditableText from '../../EditableText';

import styles from './WhatIncluded.module.scss';

interface Props {
	label: string;
	text: string;
	onClose(): void;
	onUpdate(d: string): void;
}

const WhatIncluded = ({
	label,
	text,
	onClose,
	onUpdate,
}: Props) => {
	const { newData, getTourById } = useContext(DataContext);
	const tour = useMemo(() => getTourById(Number(router.query.id)), [router.query, newData]) as NewTour;

	return (
		<div className={`${styles.popupContent} popupContent`}>
			<div className={styles.text}>
				<h4 className={styles.title}>{label}</h4>
				<div className={styles.descWrapper}>
					<p className={styles.desc}>
						{/* @ts-ignore eslint-disable-next-line */}
						<EditableText iColor="black" onSave={onUpdate}>{tour[text]}</EditableText>
					</p>
				</div>
				<ButtonClose className={styles.buttonClose} onClick={onClose} />
			</div>
		</div>
	);
};

export default WhatIncluded;
