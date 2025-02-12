import { KitchenTabs } from '../../components/kitchen-tabs';
import { RelevantKitchen } from '../../components/relevant-kitchen';
import { SectionHeader } from '../../components/section-header';
import { cookiesRecipes } from '../../mocks/recipes';

// TODO: Переименовать в kitchen page и отревакторить для маппинга в роутере

const relevantTitle = 'Десерты, выпечка';
const relevantDesc =
    'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.';

export const VeganPage = () => {
    return (
        <>
            <SectionHeader />
            <KitchenTabs />
            <RelevantKitchen
                title={relevantTitle}
                description={relevantDesc}
                recipes={cookiesRecipes}
            />
        </>
    );
};
