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
        },
        extend: {
            height: {
                0.5: '0.2px',
            },
        },
    },
    plugins: [],
};
