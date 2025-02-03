import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { routes } from './routes';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider>
            <BrowserRouter>{routes}</BrowserRouter>
        </ChakraProvider>
    </StrictMode>,
);
