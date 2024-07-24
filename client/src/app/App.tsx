import React, {
    Suspense, useCallback, useEffect, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDevice } from 'shared/lib/hooks/useGetDevice/useGetDevice';
import { DeviceActions } from 'entities/Device';
import {
    fetchUpdateUser, getUserId, getUserProfileId,
} from 'entities/User';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { Navbar } from 'widgets/Navbar/ui/Navbar/Navbar';
import { Asidebar } from 'widgets/Asidebar/ui/Asidebar/Asidebar';
import { useLocation } from 'react-router-dom';
import { MediaModal } from 'widgets/MediaModal/ui/MediaModal/MediaModal';
import { getUIScroll } from 'features/UI/model/selectors/ui';

interface Message {
    message: string;
    id: number;
}

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { device, timezone } = useGetDevice();
    const userData = useSelector(getUserId);
    const isUserProfile = useSelector(getUserProfileId);
    const [isInited, setIsInited] = useState<boolean>(false);
    const location = useLocation();
    const scroll = useSelector(getUIScroll);

    const isAuth = userData && isUserProfile;
    const isPass = isAuth || location.pathname.includes('/profile');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const initFunc = useCallback(async () => {
        await dispatch(DeviceActions.saveDevice(device + timezone));
        await dispatch(DeviceActions.saveTimezone(timezone));
        await dispatch(fetchUpdateUser());
        setIsInited(true);
    }, [device, dispatch, timezone]);

    useEffect(() => {
        initFunc();
    }, [initFunc]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                {isInited && ([
                    isPass && <Navbar />,
                    <div className="content-page">
                        {isPass && <Sidebar />}
                        <AppRouter />
                    </div>,
                ])}
            </Suspense>
            <ThemeSwitcher />
        </div>
    );
}

export default App;
