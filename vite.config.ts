import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            // the entry file that is loaded whenever someone imports
            // your plugin in their app
            entry: path.resolve(__dirname, 'src/SimpleTabs/index.ts'),

            // the exposed global variable
            // is required when formats includes 'umd' or 'iife'
            name: 'simple-tabs',

            // the proper extensions will be added, ie:
            // name.js (es module)
            // name.umd.cjs) (common js module)
            // default fileName is the name option of package.json
            fileName: (format) => `simple-tabs.${format}.js`,
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
            },
        },
    },
});
