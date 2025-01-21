import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            // keyframes: {
            //     slide: {
            //         '0%': { transform: 'translateX(0)' },
            //         '33%': { transform: 'translateX(-100%)' },
            //         '66%': { transform: 'translateX(-200%)' },
            //         '100%': { transform: 'translateX(-300%)' },
            //     },
            // },
            // animation: {
            //     slide: 'slide 12s alternate',
            // },
        },
    },

    plugins: [(forms), require('daisyui')],
    
};
