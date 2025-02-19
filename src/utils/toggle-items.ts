export const toggleItemInArray = (array: string[], item: string) => {
    if (array.includes(item)) {
        return array.filter((existingItem) => existingItem !== item);
    } else {
        return [...array, item];
    }
};
