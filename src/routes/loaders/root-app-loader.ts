import { LoaderFunction } from 'react-router';

import { store } from '~/redux/configure-store';
import { resetAccordion } from '~/redux/features/accordion-slice';
import { resetBlogger } from '~/redux/features/bloggers-slice';

export const rootAppLoader: LoaderFunction = async () => {
    store.dispatch(resetBlogger());
    return {
        recipes: store.dispatch(resetAccordion()),
    };
};
