import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Tabs, TabsDirection } from 'shared/ui/Tabs/Tabs';
import { ResetPasswordActions } from '../../model/slices/ResetPasswordSlice';
import { fetchCode } from '../../model/services/fetchCode/fetchCode';
import { getResetPasswordMethod, getResetPasswordMethods } from '../../model/selectors/getResetPassword/getResetPassword';
import cls from './ResetPasswordMethods.module.scss';

interface ResetPasswordMethodsProps {
    className?: string;
}

function maskAllButLastFour(str: string) {
    return str.slice(0, -4).replace(/./g, '*') + str.slice(-4);
}

const ResetPasswordMethods = memo((props: ResetPasswordMethodsProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('resetPassword');
    const dispatch = useAppDispatch();
    const method = useSelector(getResetPasswordMethod);
    const methods = useSelector(getResetPasswordMethods);

    const onNextClick = useCallback(() => {
        dispatch(fetchCode());
    }, [dispatch]);

    const onCancelClick = useCallback(() => {
        dispatch(ResetPasswordActions.clearAll());
    }, [dispatch]);

    const onTabClick = useCallback((value: string) => {
        dispatch(ResetPasswordActions.setMethod(value));
    }, [dispatch]);

    return (
        <VStack
            className={classNames(cls.ResetPassword, {}, [className])}
            align="center"
            justify="start"
            maxH
        >
            <VStack gap="24" align="center">
                <VStack gap="4" align="center">
                    <Text
                        size={TextSize.ML}
                        theme={TextTheme.PRIMARY}
                        className={cls.formHeaderText}
                    >
                        {t('Куда нужно отправить код подтверждения?')}
                    </Text>
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.GREY}
                        className={cls.formHeaderText}
                    >
                        {t('Прежде чем вы сможете изменить пароль, нам нужно убедиться, что это действительно вы.')}
                    </Text>
                </VStack>
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.GREY}
                    className={cls.formHeaderText}
                >
                    {t('Первым делом укажите, куда следует отправить код подтверждения.')}
                </Text>
                <Tabs
                    tabs={methods.map((method, index) => ({
                        value: method,
                        content: index === 0
                            ? (
                                <Text
                                    size={TextSize.M}
                                    className={cls.tabText}
                                    key={method}
                                >
                                    {`${t('Отправить SMS с кодом на номер')} ${maskAllButLastFour(method)}`}
                                </Text>
                            )
                            : (
                                <Text
                                    size={TextSize.M}
                                    className={cls.tabText}
                                    key={method}
                                >
                                    {
                                        `${t('Отправить письмо с кодом на электронный адрес')} 
                                    ${maskAllButLastFour(method.split('@')[0])}${method.split('@')[1]}`
                                    }
                                </Text>
                            ),
                    }))}
                    value={method}
                    onTabClick={onTabClick}
                    direction={TabsDirection.COLUMN}
                />
                <VStack
                    gap="8"
                    align="center"
                    className={cls.formBtns}
                >
                    <Button
                        theme={ButtonTheme.PRIMARY_BLACK}
                        isWide
                        className={cls.nextBtn}
                        onClick={onNextClick}
                    >
                        {t('Далее')}
                    </Button>
                    <Button
                        theme={ButtonTheme.SECONDARY_BLACK}
                        onClick={onCancelClick}
                        isWide
                    >
                        {t('Отмена')}
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
});

export default ResetPasswordMethods;
