import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { store } from './redux/configure-store.ts';
import { AppRoutes } from './routes/index.tsx';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
