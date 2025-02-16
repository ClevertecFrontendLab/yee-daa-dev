import { PageType } from '../../types/page.ts';
import { KitchenPage } from '../kitchen-page/kitchen-page.tsx';

export const JuiciestPage = () => <KitchenPage pageType={PageType.Juiciest} />;
