import { memo, useCallback } from 'react';
import { Select, SelectSizes } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { Month } from '../model/types/Month';

interface MonthProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const options = [
    { value: '01', content: Month.JANUARY },
    { value: '02', content: Month.FEBRUARY },
    { value: '03', content: Month.MARCH },
    { value: '04', content: Month.APRIL },
    { value: '05', content: Month.MAY },
    { value: '06', content: Month.JUNE },
    { value: '07', content: Month.JULY },
    { value: '08', content: Month.AUGUST },
    { value: '09', content: Month.SEPTEMBER },
    { value: '10', content: Month.OCTOBER },
    { value: '11', content: Month.NOVEMBER },
    { value: '12', content: Month.DECEMBER },
];

export const MonthSelect = memo((props: MonthProps) => {
    const {
        className,
        value,
        onChange,
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value);
    }, [onChange]);

    return (
        <Select
            label={t('Месяц')}
            className={className}
            options={options}
            value={value}
            onChange={onChangeHandler}
            size={SelectSizes.MONTH_SIZE}
        />
    );
});
