import { useLocation } from 'react-router';

import { Paths } from '~/constants/path';

export const useIsErrorPage = () => {
    const { pathname } = useLocation();

    return pathname.includes(Paths.ERROR);
};
