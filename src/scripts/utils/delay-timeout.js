export const delayTimeout = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
};
