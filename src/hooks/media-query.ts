import { useMediaQuery } from '@chakra-ui/icons';

export const useIsTablet = () => {
    const [isTablet] = useMediaQuery('(max-width: 1120px)');

    return isTablet;
};
