import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, ReactNode } from 'react';
import cls from './FileInput.module.scss';

export enum FileInputTheme {
    PRIMARY = 'primary',
    ICON = 'icon',
}

interface FileInputProps {
    className?: string;
    children?: React.VFC<React.SVGProps<SVGSVGElement>> | ReactNode;
    onChange?: (file: File) => void;
    theme?: FileInputTheme;
    type: string;
    accept?: string;
}

export const FileInput = memo((props: FileInputProps) => {
    const {
        className,
        children,
        onChange,
        theme = FileInputTheme.PRIMARY,
        type,
        accept = '',
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) onChange?.(e.target.files[0]);
    };

    return (
        <label
            className={classNames(cls.FileInput, {}, [className, cls[theme]])}
            htmlFor={`${type}-file-input`}
        >
            {children}
            <input
                className={cls.input}
                id={`${type}-file-input`}
                type="file"
                onChange={onChangeHandler}
                accept={accept}
            />
        </label>
    );
});
