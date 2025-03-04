export const replaceUnderScoreId = <T extends { _id: string }>(response: T) => {
    const { _id, ...rest } = response;
    return { ...rest, id: _id };
};
