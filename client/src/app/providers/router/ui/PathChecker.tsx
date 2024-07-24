import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserId, getUserProfileId } from 'entities/User';

export function PathChecker({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const userId = useSelector(getUserId);
    const userProfileId = useSelector(getUserProfileId);

    const isAuth = userId && userProfileId;

    if (isAuth && location.pathname === '/') {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/news" state={{ from: location }} replace />;
    }

    return children;
}
