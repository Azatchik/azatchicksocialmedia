import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { MediaModal } from 'widgets/MediaModal';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { MediaReducer } from 'entities/Media';
import { MusicPlayerReducer } from 'widgets/MusicPlayer';
import { ProfileReducer } from 'entities/Profile';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

const reducers: ReducersList = {
    media: MediaReducer,
    musicPlayer: MusicPlayerReducer,
};

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getUIScrollByPath(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(uiActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 100);

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <main
                ref={wrapperRef}
                className={classNames(cls.Page, {}, [className])}
                onScroll={onScroll}
                id={PAGE_ID}
                style={onScrollEnd && { paddingBottom: '10px' }}
            >
                {children}
                {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
                <MediaModal />
            </main>
        </DynamicModuleLoader>
    );
});
