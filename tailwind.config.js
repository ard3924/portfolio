/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./script.js",
    ],
    theme: {
        container: {
            center: true,
            padding: '1.25rem',
            screens: {
                '2xl': '1100px',
            },
        },
        extend: {
            fontFamily: { sans: ['Sora', 'ui-sans-serif', 'system-ui'] },
            colors: {
                // Light theme (default)
                background: '#f9fafb', // gray-50
                panel: '#ffffff',
                text: '#111827', // gray-900
                muted: '#6b7280', // gray-500
                border: '#e5e7eb', // gray-200
                accent: '#7c5cff',
                'accent-2': '#00e0a4',
                // Dark theme
                dark: {
                    background: '#0b0c10',
                    panel: '#0f1115',
                    text: '#e6e6e6',
                    muted: '#b3b3b3',
                    border: '#22242a',
                }
            },
            borderRadius: {
                radius: '12px',
            },
            boxShadow: {
                DEFAULT: '0 8px 24px rgba(0, 0, 0, 0.25)',
            }
        },
        keyframes: {
            'fade-in-up': {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            }
        },
        animation: {
            'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        }
    },
    plugins: [],
}