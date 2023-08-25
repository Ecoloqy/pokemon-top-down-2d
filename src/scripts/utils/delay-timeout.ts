export const delayTimeout = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
};
