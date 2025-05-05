import { LoaderFunction } from 'react-router';

import { store } from '~/redux/configure-store';
import { setBloggersLimit } from '~/redux/features/bloggers-slice';

export const blogsLoader: LoaderFunction = async () => {
    store.dispatch(setBloggersLimit('9'));
};
