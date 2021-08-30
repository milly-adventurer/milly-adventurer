import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import UserInfoContext from "../../contexts/UserInfo";

import styles from './EditableText.module.scss';

interface Props {
	iHeight?: number;
	iWidth?: number;
	iColor?: string;
	onSave(text: string): void,
}

const EditIcon = ({
	height = 40,
	width = 40,
	color = 'white',
	onClick,
	className,
}: {
	height?: number;
	width?: number;
	color?: string;
	onClick(): void;
	className?: string;
}) => {
	return (
		<button onClick={onClick}>
			<svg className={className} height={height} fill={color} viewBox="0 0 492.49284 492" width={width}>
				<path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"/><path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"/>
			</svg>
		</button>
	)
};

const EditableText = ({
	onSave,
	iColor,
	iHeight,
	iWidth,
	children,
}: PropsWithChildren<Props>) => {
	const { canEdit } = useContext(UserInfoContext);
	const [isEditMode, setIsEditMode] = useState(false);
	const initialValue = useRef(children as string);
	const [value, setValue] = useState(children as string);
	const editableRef = useRef<any>(null);

	const onSaveCustom = (data: any) => {
		onSave(data);
		setValue(children as string);
		initialValue.current = data;
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

	useEffect(() => {
		if (isEditMode === true) {
			setValue(initialValue.current);
		}
	}, [isEditMode]);

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
