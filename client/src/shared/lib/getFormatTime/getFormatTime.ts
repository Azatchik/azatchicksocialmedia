export const getFormatTime = (sec: number) => {
    const pad = (num: number) => (num < 10 ? `0${num}` : num.toString());
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
};
