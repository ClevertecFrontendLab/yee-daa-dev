import { useMediaQuery } from '@chakra-ui/icons';

import { theme } from '~/theme/theme';

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

export const useIsSmallScreen = () => {
    const [isSmallScreen] = useMediaQuery(`(width < ${theme.breakpoints.md})`);

    return isSmallScreen;
};
