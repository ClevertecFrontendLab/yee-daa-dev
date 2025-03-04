export const getBorderColor = (inputValue: string, isSearchEmpty?: boolean) => {
    switch (true) {
        case inputValue && !isSearchEmpty:
            return 'var(--chakra-colors-lime-600)';
        case !inputValue:
            return 'blackAlpha.600';
        case isSearchEmpty && !!inputValue:
            return 'red.500';
        default:
            return 'blackAlpha.600';
    }
};
