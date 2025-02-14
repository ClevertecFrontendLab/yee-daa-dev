import { Paths } from '../../../constants/path';
import { MenuItem } from '../../../types/category';

export const generatePathsMap = (navMenu: MenuItem[]) => {
    const pathsMap: Record<string, string> = {
        [Paths.R_SWITCHER]: 'Главная',
        [Paths.JUICIEST]: 'Самое сочное',
    };

    navMenu.forEach((item) => {
        pathsMap[item.category] = item.title;
        item.subItems?.forEach((subItem) => {
            pathsMap[subItem.category] = subItem.title;
        });
    });

    return pathsMap;
};
