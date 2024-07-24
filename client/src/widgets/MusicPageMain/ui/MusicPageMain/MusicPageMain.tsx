import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserProfileId } from 'entities/User';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import uploadIcon from 'shared/assets/icons/upload.svg';
import { UploadFile, UploadFileTypes } from 'features/UploadFile';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import {
    getMusicPageMainMyMusic,
    MusicPageMainMyMusicActions,
    MusicPageMainMyMusicReducer,
} from '../../model/slices/MusicPageMainMyMusicSlice';
import { MusicPageMainTabs } from '../MusicPageMainTabs/MusicPageMainTabs';
import cls from './MusicPageMain.module.scss';
import { getMusicPageMainMyMusicIsLoading } from '../../model/selectors/getMusicPageMainMyMusic/getMusicPageMainMyMusic';
import { MusicPageMainSkeleton } from './MusicPageMainSkeleton';
import { fetchInitMyMusic } from '../../model/services/fetchInitMyMusic/fetchInitMyMusic';
import { MusicPageMainMyMusic } from '../MusicPageMainMyMusic/MusicPageMainMyMusic';
import { MusicPageMainSearch } from '../MusicPageMainSearch/MusicPageMainSearch';
import { MusicPageMainSearchReducer } from '../../model/slices/MusicPageMainSearchSlice';

interface MusicPageMainProps {
    className?: string;
    tabValue: string;
    onSetTabValue: (value: string) => void;
}

const reducers: ReducersList = {
    musicPageMainMyMusic: MusicPageMainMyMusicReducer,
    musicPageMainSearch: MusicPageMainSearchReducer,
};

export const MusicPageMain = memo((props: MusicPageMainProps) => {
    const { className, tabValue, onSetTabValue } = props;
    const { t } = useTranslation();
    const { id } = useParams();
    const userProfileId = useSelector(getUserProfileId);
    const isCurrentProfile = userProfileId === id;
    const isLoading = useSelector(getMusicPageMainMyMusicIsLoading);
    const dispatch = useAppDispatch();
    const music = useSelector(getMusicPageMainMyMusic.selectAll);
    const [isOpenUploadMusicModal, bindUploadMusicModal] = useModal();

    const onTabClick = useCallback((value: string) => {
        onSetTabValue(value);
    }, [onSetTabValue]);

    useEffect(() => {
        if (id && !music.length) {
            dispatch(MusicPageMainMyMusicActions.setPage(1));
            dispatch(MusicPageMainMyMusicActions.setHasMore(true));
            dispatch(MusicPageMainMyMusicActions.setProfileId(id));
            dispatch(fetchInitMyMusic());
        }
    }, [dispatch, id, music.length]);

    let content;

    if (isLoading) {
        content = <MusicPageMainSkeleton />;
    } else {
        content = (
            <VStack
                gap="16"
            >
                {isCurrentProfile
                    ? (
                        <HStack
                            maxW
                            justify="between"
                        >
                            <MusicPageMainTabs onTabClick={onTabClick} tabValue={tabValue} />
                            <HStack
                                gap="8"
                                className={cls.uploadBtn}
                                onClick={bindUploadMusicModal.onShowModal}
                            >
                                <Icon
                                    Svg={uploadIcon}
                                    size={IconSizes.SMALL}
                                    theme={IconTheme.PRIMARY}
                                />
                                <Text
                                    theme={TextTheme.PRIMARY}
                                    size={TextSize.SSM}
                                    isBold
                                    className={cls.uploadBtnText}
                                >
                                    {t('Загрузить музыку')}
                                </Text>
                            </HStack>
                            <UploadFile
                                isOpen={isOpenUploadMusicModal}
                                onClose={bindUploadMusicModal.onCloseModal}
                                type={UploadFileTypes.MUSIC}
                            />
                        </HStack>
                    )
                    : (
                        <Text
                            isBold
                            theme={TextTheme.PRIMARY}
                            size={TextSize.SSM}
                        >
                            {t('Музыка пользователя')}
                        </Text>
                    )}
                {tabValue === 'myMusic'
                    ? <MusicPageMainMyMusic />
                    : <MusicPageMainSearch />}
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card
                className={classNames(cls.MusicPageMain, {}, [className])}
                theme={CardTheme.PANEL}
            >
                {content}
            </Card>
        </DynamicModuleLoader>
    );
});
