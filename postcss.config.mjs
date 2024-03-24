// Correct ES Module syntax for postcss.config.mjs
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    // any other plugins
  ],
};