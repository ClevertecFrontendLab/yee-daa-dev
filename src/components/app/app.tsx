import { RouterProvider } from 'react-router';

import { appRouter } from '~/routes';

export const App = () => <RouterProvider router={appRouter} />;
