import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { AppLink, AppLinkSizes, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import profileIcon from 'shared/assets/icons/profile.svg';
import profileFillIcon from 'shared/assets/icons/profile-fill.svg';
import messagesIcon from 'shared/assets/icons/messages.svg';
import messagesFillIcon from 'shared/assets/icons/messages-fill.svg';
import newsIcon from 'shared/assets/icons/news.svg';
import newsFillIcon from 'shared/assets/icons/news-fill.svg';
import bookMarkIcon from 'shared/assets/icons/bookmarks.svg';
import bookMarkFillIcon from 'shared/assets/icons/bookmarks-fill.svg';
import musicFillIcon from 'shared/assets/icons/music-fill.svg';
import musicIcon from 'shared/assets/icons/music.svg';
import subscriptionsIcon from 'shared/assets/icons/subscriptions.svg';
import subscriptionsFillIcon from 'shared/assets/icons/subscriptions-fill.svg';
import followersIcon from 'shared/assets/icons/followers.svg';
import followersFillIcon from 'shared/assets/icons/followers-fill.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserProfileId } from 'entities/User';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const profileId = useSelector(getUserProfileId);

    return (
        <aside className={classNames(cls.Sidebar, {}, [className])}>
            <VStack
                align="start"
                justify="start"
                maxH
                gap="4"
            >
                <AppLink
                    to={RoutePath.news}
                    size={AppLinkSizes.MEDIUM}
                    theme={AppLinkTheme.CLEAN}
                    icon={newsIcon}
                    iconFill={newsFillIcon}
                    className={cls.link}
                    isLink
                >
                    {t('Новости')}
                </AppLink>
                <AppLink
                    to={RoutePath.profile + profileId}
                    size={AppLinkSizes.MEDIUM}
                    theme={AppLinkTheme.CLEAN}
                    icon={profileIcon}
                    iconFill={profileFillIcon}
                    className={cls.link}
                    isLink
                >
                    {t('Мой профиль')}
                </AppLink>
                <AppLink
                    to={RoutePath.messages}
                    size={AppLinkSizes.MEDIUM}
                    theme={AppLinkTheme.CLEAN}
                    icon={messagesIcon}
                    iconFill={messagesFillIcon}
                    className={cls.link}
                    isLink
                >
                    {t('Сообщения')}
                </AppLink>
                <AppLink
                    to={RoutePath.followers.replace(':id', profileId)}
                    size={AppLinkSizes.MEDIUM}
                    theme={AppLinkTheme.CLEAN}
                    icon={followersIcon}
                    iconFill={followersFillIcon}
                    className={cls.link}
                    isLink
                >
                    {t('Подписчики')}
                </AppLink>
                <AppLink
                    to={RoutePath.subscriptions.replace(':id', profileId)}
                    size={AppLinkSizes.MEDIUM}
                    theme={AppLinkTheme.CLEAN}
                    icon={subscriptionsIcon}
                    iconFill={subscriptionsFillIcon}
                    className={cls.link}
                    isLink
                >
                    {t('Подписки')}
                </AppLink>
                <AppLink
                    to={RoutePath.music + profileId}
                    size={AppLinkSizes.MEDIUM}
                    theme={AppLinkTheme.CLEAN}
                    icon={musicIcon}
                    iconFill={musicFillIcon}
                    className={cls.link}
                    isLink
                >
                    {t('Музыка')}
                </AppLink>
                <AppLink
                    to={RoutePath.bookmarks}
                    size={AppLinkSizes.MEDIUM}
                    theme={AppLinkTheme.CLEAN}
                    icon={bookMarkIcon}
                    iconFill={bookMarkFillIcon}
                    className={cls.link}
                    isLink
                >
                    {t('Закладки')}
                </AppLink>
                <Button
                    theme={ButtonTheme.PRIMARY}
                    className={cls.createPostBtn}
                    isBig
                >
                    {t('Создать пост')}
                </Button>
            </VStack>
        </aside>
    );
});
