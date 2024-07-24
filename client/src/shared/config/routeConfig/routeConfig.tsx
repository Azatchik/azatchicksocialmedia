import { RouteProps } from 'react-router-dom';
import { NewsPage } from 'pages/NewsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import { ProfilePage } from 'pages/ProfilePage';
import { EditProfilePage } from 'pages/EditProfilePage';
import { MusicPage } from 'pages/MusicPage';
import { SubscriptionsPage } from 'pages/SubscriptionsPage';
import { FollowersPage } from 'pages/FollowersPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    NEWS = 'news',
    PROFILE = 'profile',
    EDIT_PROFILE = 'edit_profile',
    MESSAGES = 'messages',
    SUBSCRIPTIONS = 'subscriptions',
    FOLLOWERS = 'followers',
    MUSIC = 'music',
    BOOKMARKS = 'bookmarks',
    // Неавторизованным
    AUTHORIZATION_PAGE = 'authorization_page',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.NEWS]: '/news',
    [AppRoutes.PROFILE]: '/profile/', // + id
    [AppRoutes.EDIT_PROFILE]: '/edit',
    [AppRoutes.MESSAGES]: '/messages',
    [AppRoutes.SUBSCRIPTIONS]: '/profile/:id/subscriptions',
    [AppRoutes.FOLLOWERS]: '/profile/:id/followers',
    [AppRoutes.MUSIC]: '/music/', // + id
    [AppRoutes.BOOKMARKS]: '/bookmarks',
    // Неавторизованным
    [AppRoutes.AUTHORIZATION_PAGE]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPage />,
        authOnly: true,
    },
    [AppRoutes.EDIT_PROFILE]: {
        path: RoutePath.edit_profile,
        element: <EditProfilePage />,
        authOnly: true,
    },
    [AppRoutes.MESSAGES]: {
        path: RoutePath.messages,
        element: <NewsPage />,
        authOnly: true,
    },
    [AppRoutes.SUBSCRIPTIONS]: {
        path: RoutePath.subscriptions,
        element: <SubscriptionsPage />,
        authOnly: true,
    },
    [AppRoutes.FOLLOWERS]: {
        path: RoutePath.followers,
        element: <FollowersPage />,
        authOnly: true,
    },
    [AppRoutes.MUSIC]: {
        path: `${RoutePath.music}:id`,
        element: <MusicPage />,
        authOnly: true,
    },
    [AppRoutes.BOOKMARKS]: {
        path: RoutePath.bookmarks,
        element: <NewsPage />,
        authOnly: true,
    },
    // Неавторизованным
    [AppRoutes.AUTHORIZATION_PAGE]: {
        path: RoutePath.authorization_page,
        element: <AuthorizationPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
