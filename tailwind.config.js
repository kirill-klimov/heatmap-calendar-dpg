/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        value: {
          1: '#ACD5F2', 
          2: '#7FA8C9', 
          3: '#527BA0', 
          4: '#254E77', 
        }
      }
    },
  },
  safelist: [
    'bg-value-1',
    'bg-value-2',
    'bg-value-3',
    'bg-value-4',
  ],
  plugins: [],
}

