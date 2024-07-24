import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    memo,
    MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import exitIcon from 'shared/assets/icons/x-symbol.svg';
import { Button, ButtonTheme } from '../Button/Button';
import { Icon, IconSizes } from '../Icon/Icon';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

export enum ModalSizes {
    PRIMARY = 'primary',
    BIG = 'big',
    GALLERY = 'gallery',
    MEDIA = 'media',
    UPLOAD = 'upload',
    DELETE = 'delete',
    PROFILE = 'profile',
}

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
    size?: ModalSizes;
    isPanel?: boolean;
}

const ANIMATION_DELAY = 150;

export const Modal = memo((props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
        size = ModalSizes.PRIMARY,
        isPanel = false,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // Новые ссылки!!!
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls.panel]: isPanel,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, cls[size]])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div
                        className={cls.content}
                        onClick={onContentClick}
                    >
                        <Button
                            theme={ButtonTheme.CLEAN}
                            onClick={closeHandler}
                            className={cls.exitBtn}
                        >
                            <Icon
                                Svg={exitIcon}
                                size={IconSizes.SMALL}
                            />
                        </Button>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
});
