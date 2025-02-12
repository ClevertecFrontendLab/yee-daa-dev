import { useLocation } from 'react-router';

import { Paths } from '../constants/path.ts';

export const useSecondLevelPath = () => {
    const { pathname } = useLocation();
    const [, secondLevelPath] = pathname.split('/');

    return secondLevelPath.length ? secondLevelPath : Paths.R_SWITCHER;
};
