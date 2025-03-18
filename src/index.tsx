import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode, StrictMode } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './components/app';
import { AppNotification } from './components/app-notification/app-notification.tsx';
import { store } from './redux/configure-store.ts';
import { theme } from './theme/theme.ts';

const rootElement = document.getElementById('root') ?? document.body;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <App />
                {createPortal(<AppNotification />, document.body) as ReactNode}
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
