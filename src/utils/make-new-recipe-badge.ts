export const makeNewRecipeBadge = (num: number) => {
    switch (num % 10) {
        case 1:
            return `${num} новый рецепт`;
        case 2:
        case 3:
        case 4:
            return `${num} новых рецепта`;
        default:
            return `${num} новых рецептов`;
    }
};
