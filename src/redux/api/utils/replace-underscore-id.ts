type UnderscoreId = { _id: string };

export const replaceUnderscoreId = <T extends UnderscoreId, P extends T>(response: T | P) => {
    const { _id, ...rest } = response;
    return { ...rest, id: _id };
};

export const replaceMapUnderscoreId = <T extends UnderscoreId>(array: T[]) =>
    array.map((el) => replaceUnderscoreId(el));
