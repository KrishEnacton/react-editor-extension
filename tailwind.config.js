/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        add_button: '#d1ecf1',
        rejected_button: '#ff9999',
        update_button: '#d4edda',
        restore_button: '#e2e3e5',
      },
    },
  },
  plugins: [],
}
