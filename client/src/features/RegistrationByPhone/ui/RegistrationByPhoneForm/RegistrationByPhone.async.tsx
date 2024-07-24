import { lazy } from 'react';

interface RegistrationByPhoneFormAsyncProps {
    onOpenAuth?: () => void;
}

export const RegistrationByPhoneFormAsync = (props: RegistrationByPhoneFormAsyncProps) => {
    const {
        onOpenAuth,
    } = props;

    const LazyComponent = lazy(() => import('./RegistrationByPhoneForm'));

    return (
        <LazyComponent onOpenAuth={onOpenAuth} />
    );
};
