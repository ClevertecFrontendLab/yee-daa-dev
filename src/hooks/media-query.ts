import { useMediaQuery } from '@chakra-ui/icons';

export const useIsTablet = () => {
    const [isTablet] = useMediaQuery('(max-width: 768px)');

    return isTablet;
};
