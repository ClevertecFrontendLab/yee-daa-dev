import { FC } from 'react';

import { PageType } from '../../types/page';
import { KitchenPage } from '../kitchen-page';

export const CategoryPage: FC = () => <KitchenPage pageType={PageType.Category} />;
