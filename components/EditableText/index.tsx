import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import {UserInfoContext} from "../../contexts/UserInfo";
import EditIcon from "../EditIcon";

import styles from './EditableText.module.scss';

interface Props {
	iHeight?: number;
	iWidth?: number;
	iColor?: string;
	onSave(text: string): void,
}

const EditableText = ({
	onSave,
	iColor,
	iHeight = 10,
	iWidth = 10,
	children,
}: PropsWithChildren<Props>) => {
	const { canEdit } = useContext(UserInfoContext);
	const [isEditMode, setIsEditMode] = useState(false);
	// const initialValue = useRef(children as string);
	const [value, setValue] = useState(children as string);
	const editableRef = useRef<any>(null);

	const onSaveCustom = (data: any) => {
		onSave(data);
		setValue(children as string);
		// initialValue.current = data;
		setIsEditMode(false);
	}

	useEffect(() => {
		setValue(children as string);
	}, [children]);

	useEffect(() => {
		if (isEditMode === true && editableRef.current) {
			editableRef.current.focus();
		}
	}, [isEditMode]);

	// useEffect(() => {
	// 	if (isEditMode === true) {
	// 		setValue(initialValue.current);
	// 	}
	// }, [isEditMode]);

	return isEditMode ? (
		<div className={styles.editBlock}>
			<ContentEditable innerRef={editableRef} className={styles.textarea} disabled={false} onChange={(event) => setValue(event.target.value)} html={value} />
			<button className={`${styles.btn} ${styles.btnSuccess}`} onClick={() => onSaveCustom(value)}>Сохранить</button>
			<button className={`${styles.btn} ${styles.btnError}`} onClick={() => {
				setValue(children as string);
				setIsEditMode(false);
			}}>Отменить</button>
		</div>
	) :  (
		<div className={styles.notEditBlock}>
			<span dangerouslySetInnerHTML={{ __html: value as string }} />
			{canEdit && (
				<EditIcon onClick={() => setIsEditMode(true)} color={iColor} height={iHeight} width={iWidth} className={styles.edit}/>
			)}
		</div>
	)
};

export default EditableText;
