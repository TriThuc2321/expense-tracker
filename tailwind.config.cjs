/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: '#1B1C31',
            white: '#fff',
            black: '#000',
            unselected: '#6F767E',
            slate: colors.slate,
            gray: colors.gray,
            error: 'rgb(211, 47, 47)',
            warning: 'rgb(245, 124, 0)',
            success: 'rgb(56, 142, 60)',
            info: 'rgb(2, 136, 209)',
            primary03: '#1b1c317d',
        },
        extend: {
            height: {
                0.5: '0.2px',
            },
        },
        screens: {
            tablet: '640px',
            laptop: '1024px',
            desktop: '1280px',
        },
    },
    plugins: [],
};
