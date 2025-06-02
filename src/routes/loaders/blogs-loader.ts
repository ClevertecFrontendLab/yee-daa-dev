import { LoaderFunction } from 'react-router';

import { store } from '~/redux/configure-store';
import { resetBlogger, setBloggersLimit } from '~/redux/features/bloggers-slice';

export const blogsLoader: LoaderFunction = async () => {
    store.dispatch(setBloggersLimit('9'));
    store.dispatch(resetBlogger());
};
