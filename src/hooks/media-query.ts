import { useMediaQuery } from '@chakra-ui/icons';

export const useIsTablet = () => {
    const [isTablet] = useMediaQuery('(max-width: 1120px)');

    return isTablet;
};

export const useIsLg = () => {
    const [isTablet] = useMediaQuery('(max-width: 992px)');

    return isTablet;
};

export const useIsMobile = () => {
    const [isMobile] = useMediaQuery('(max-width: 425px)');

    return isMobile;
};
