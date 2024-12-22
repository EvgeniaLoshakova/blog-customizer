import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, {
	CSSProperties,
	FormEvent,
	useState,
	useEffect,
	useRef,
} from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type FormProps = { onChange: (styles: ArticleStyles) => void };
type ArticleStyles = CSSProperties & {
	'--font-family'?: string;
	'--font-size'?: string;
	'--font-color'?: string;
	'--container-width'?: string;
	'--bg-color'?: string;
};

export const ArticleParamsForm = ({ onChange }: FormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColors] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColors] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	function applyParams(e: FormEvent) {
		e.preventDefault();
		onChange({
			'--font-family': fontFamily.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': contentWidth.value,
			'--bg-color': backgroundColor.value,
		});
	}

	function resetParams() {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColors(defaultArticleState.fontColor);
		setBackgroundColors(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onChange({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		});
	}

	const sidebarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		function closeSidebar(event: MouseEvent) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		}

		if (isMenuOpen) {
			document.addEventListener('mousedown', closeSidebar);
		}
		return () => {
			document.removeEventListener('mousedown', closeSidebar);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClickSidebar={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={applyParams}>
					<Text as={'h2'} weight={800} size={31}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						onChange={setFontFamily}
						selected={fontFamily}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<RadioGroup
						onChange={setFontSize}
						options={fontSizeOptions}
						selected={fontSize}
						title='РАЗМЕР ШРИФТА'
						name='fontSize'
					/>
					<Select
						onChange={setFontColors}
						selected={fontColor}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<Separator />
					<Select
						onChange={setBackgroundColors}
						selected={backgroundColor}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<Select
						onChange={setContentWidth}
						selected={contentWidth}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button
							onClick={resetParams}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
