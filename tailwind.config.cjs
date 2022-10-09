/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         spacing: {
            header: 'var(--headerHeight)',
            sidebar: 'var(--sidebarWidth)',
            sidebarSmall: 'var(--sidebarWidthSmall)',
         },
         height: {
            header: 'var(--headerHeight)',
         },
         width: {
            sidebar: 'var(--sidebarWidth)',
            sidebarSmall: 'var(--sidebarWidthSmall)',
         },
         colors: {
            primary: 'var(--primaryColor)',
            secondary: 'var(--secondaryColor)',
         },
      },
   },
   plugins: [
      plugin(function ({ addBase, addComponents, addUtilities, theme }) {
         addComponents({
            '.form-input': {
               height: theme('spacing.10'),
               paddingLeft: theme('spacing.4'),
               paddingRight: theme('spacing.4'),
               border: '2px solid',
               borderColor: theme('colors.neutral.200'),
               transition: 'all 0.2s ease-in-out',
               outline: 'none',
               borderRadius: '4px',
               width: '100%',

               '&:focus': {
                  borderColor: theme('colors.primary'),
               },
            },
         });
      }),
   ],
};
