const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: '#1B1C31',
            white: '#fff',
            unselected: '#6F767E',
            slate: colors.slate,
        },
        extend: {
            height: {
                0.5: '0.2px',
            },
        },
    },
    plugins: [],
};
