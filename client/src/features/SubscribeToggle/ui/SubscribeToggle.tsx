import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { getProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserProfileId } from 'entities/User';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchUnsubscribe } from '../model/services/fetchUnsubscribe/fetchUnsubscribe';
import { fetchSubscribe } from '../model/services/fetchSubscribe/fetchSubscribe';

interface SubscribeToggleProps {
}

export const SubscribeToggle = memo((props: SubscribeToggleProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);
    const currentProfileId = useSelector(getUserProfileId);

    const fetchSubscribeFunc = useCallback(() => {
        dispatch(fetchSubscribe());
    }, [dispatch]);

    const fetchUnsubscribeFunc = useCallback(() => {
        dispatch(fetchUnsubscribe());
    }, [dispatch]);

    const debouncedFetchSubscribe = useDebounce(fetchSubscribeFunc, 200);
    const debouncedFetchUnsubscribe = useDebounce(fetchUnsubscribeFunc, 200);

    const onSubscribeClick = useCallback(() => {
        debouncedFetchSubscribe();
    }, [debouncedFetchSubscribe]);

    const onUnsubscribeClick = useCallback(() => {
        debouncedFetchUnsubscribe();
    }, [debouncedFetchUnsubscribe]);

    if (profileData.followers.includes(currentProfileId)) {
        return (
            <Button
                theme={ButtonTheme.SECONDARY}
                isSmall
                onClick={onUnsubscribeClick}
            >
                {t('Отписаться')}
            </Button>
        );
    }

    return (
        <Button
            theme={ButtonTheme.PRIMARY}
            onClick={onSubscribeClick}
            isSmall
        >
            {t('Подписаться')}
        </Button>
    );
});
