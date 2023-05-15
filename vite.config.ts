import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import typescript2 from 'rollup-plugin-typescript2';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        typescript2({
            check: false,
            include: ['src/**/*.ts'],
            tsconfigOverride: {
                compilerOptions: {
                    sourceMap: true,
                    declaration: true,
                    declarationMap: true,
                },
            },
            exclude: ['vite.config.ts', 'src/main.ts'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        cssCodeSplit: true,
        lib: {
            // the entry file that is loaded whenever someone imports
            // your plugin in their app
            entry: './src/SimpleTabsPlugin.ts',

            formats: ['es', 'cjs'],
            // the exposed global variable
            // is required when formats includes 'umd' or 'iife'
            name: 'simple-tabs-vue',

            // the proper extensions will be added, ie:
            // name.js (es module)
            // name.umd.cjs) (common js module)
            // default fileName is the name option of package.json
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                },
                exports: 'named',
            },
        },
    },
});
