type UnderscoreId = { _id: string };

export const replaceUnderscoreId = <T extends UnderscoreId, P extends T>(response: T | P) => {
    const { _id, ...rest } = response;
    return { ...rest, id: _id };
};
