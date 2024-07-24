import { lazy } from 'react';

interface AuthorizationByPhoneFormAsyncProps {
    onOpenReg?: () => void;
    onOpenReset?: () => void;
}

export const AuthorizationByPhoneFormAsync = (props: AuthorizationByPhoneFormAsyncProps) => {
    const {
        onOpenReg,
        onOpenReset,
    } = props;

    const LazyComponent = lazy(() => import('./AuthorizationByPhoneForm'));

    return (
        <LazyComponent onOpenReg={onOpenReg} onOpenReset={onOpenReset} />
    );
};
