import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import { HStack } from 'shared/ui/Stack';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { MusicPlayer } from 'widgets/MusicPlayer';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack
                align="center"
                justify="between"
                maxH
                className={cls.navbarWrapper}
            >
                <AppLink
                    to={RoutePath.news}
                    className={cls.mainLogoLink}
                    theme={AppLinkTheme.UNTHEME}
                >
                    <Icon
                        Svg={mainLogo}
                        size={IconSizes.LOWER_MEDIUM}
                    />
                </AppLink>
                <MusicPlayer />
            </HStack>
        </header>
    );
});
