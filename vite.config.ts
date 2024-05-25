import glsl from 'vite-plugin-glsl'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',

    server: {
        host: true, // Open to local network and display URL
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    plugins:
    [
        glsl(),
        react(),
        tsconfigPaths()
    ]
}