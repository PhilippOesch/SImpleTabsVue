import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        cssCodeSplit: true,
        lib: {
            entry: './src/index.ts',
            formats: ['es', 'cjs'],
            name: 'simple-tabs-vue',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['vue', './src/App.vue', './src/main.ts'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
