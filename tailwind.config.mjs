/** @type {import('tailwindcss').Config} */
export default {
 content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
 theme: {
   extend: {
     colors: {
       primary: {
         DEFAULT: '#76B82A',
         dark: '#009E39',
       },
       brandGris: '#808080',
     },
     fontFamily: {
       title: ['Outfit', 'sans-serif'],
       body: ['Montserrat', 'sans-serif'],
     },
   },
 },
 plugins: [],
}
