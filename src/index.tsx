import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { routes } from './routes';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>{routes}</BrowserRouter>
        </ChakraProvider>
    </StrictMode>,
);
