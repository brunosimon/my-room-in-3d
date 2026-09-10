import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { resolve } from 'path'

export default defineConfig({
    base: '/my-room-in-3d/',
    root: 'src',
    publicDir: '../static',

    // 🛠️ Force Vite's underlying builder to completely avoid eval scripts in development
    esbuild: {
        sourcemap: 'inline'
    },

    server: {
        host: true,
        open: true,
        // Clear out the strict headers since the root cause is browser-level constraints
    },

    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: 'source-map' 
    },

    css: {
        devSourcemap: false 
    },

    plugins: [
        glsl()
    ],

    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, './src')
        }
    }
})
