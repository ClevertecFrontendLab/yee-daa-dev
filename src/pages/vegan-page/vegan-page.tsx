import { KitchenTabs } from '../../components/kitchen-tabs';
import { SectionHeader } from '../../components/section-header';

// TODO: Переименовать в kitchen page и отревакторить для маппинга в роутере

export const VeganPage = () => {
    return (
        <div>
            <SectionHeader />
            <KitchenTabs />
        </div>
    );
};
