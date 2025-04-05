import { LoaderFunction } from 'react-router';

import { store } from '~/redux/configure-store';
import { resetAccordion } from '~/redux/features/accordion-slice';

export const rootAppLoader: LoaderFunction = async () => ({
    recipes: store.dispatch(resetAccordion()),
});
