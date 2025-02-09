import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@query': path.resolve(__dirname, 'src/query'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@store': path.resolve(__dirname, 'src/store'),
        },
    },
});
