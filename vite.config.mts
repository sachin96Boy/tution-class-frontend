import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
    base: '/',
    plugins: [
        react(),
        tsconfigPaths(),
        commonjs(),
    ],
    server: {
        open: true, // automatically open the app in the browser
        port: 3000,
    },
    resolve: {
        alias: {
            screens: path.resolve(__dirname, './src/screens'),
        },
    },
    build: {
        outDir: 'build',
    },
});