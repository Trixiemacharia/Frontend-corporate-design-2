/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#15243B',
        slate: '#52677F',
        cool: '#F8FAFC',
        soft: '#E7EEF5',
        copper: '#B97952',
        graphite: '#293746',
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      boxShadow: {
        panel: '0 1px 2px rgba(21,36,59,.05), 0 16px 36px -16px rgba(21,36,59,.22)',
        float: '0 28px 56px -20px rgba(21,36,59,.35)',
      },
    },
  },
  plugins: [],
}