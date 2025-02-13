import { FC } from 'react';

import { KitchenPage } from '../kitchen-page';

// TODO: Переименовать в kitchen page и отревакторить для маппинга в роутере

const relevantDesc =
    'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.';

export const CategoryPage: FC<{ title: string }> = ({ title }) => (
    <KitchenPage pageType='category' relevantTitle={title} relevantDesc={relevantDesc} />
);
