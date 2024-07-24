interface useDateSchema {
    time: string;
    second: string;
    minute: string;
    hour: string;
    date: string;
    day: string;
    mouth: string;
    year: string;
}

function filterTwoSymbols(symbols: string) {
    const filteredSymbols = symbols.includes('0') ? symbols[1] : symbols;
    return filteredSymbols;
}

export const useDate = (timestamp: number): useDateSchema => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = new Date(timestamp).toLocaleString('uz', { timeZone: userTimeZone });

    const splitDateFromTime = currentDate.split(', ');

    const time = splitDateFromTime[1];
    const second = filterTwoSymbols(time.split(':')[2]);
    const minute = filterTwoSymbols(time.split(':')[1]);
    const hour = filterTwoSymbols(time.split(':')[0]);

    const date = splitDateFromTime[0];
    const day = filterTwoSymbols(date.split('/')[0]);
    const mouth = filterTwoSymbols(date.split('/')[1]);
    const year = date.split('/')[2];

    return {
        time,
        second,
        minute,
        hour,
        date,
        day,
        mouth,
        year,
    };
};
