export const isButtonDisabled = (...selectors: string[][]) => {
    const totalLength = selectors.reduce((acc, selector) => {
        if (Array.isArray(selector)) {
            return acc + selector.length;
        }
        return acc;
    }, 0);

    return !totalLength;
};
