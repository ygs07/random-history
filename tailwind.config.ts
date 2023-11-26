import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
    extend: {
      colors: {
        primary:  {
          100: "#dcdfdc",
          200: "#b8c0b9",
          300: "#95a097",
          400: "#718174",
          500: "#4e6151",
          600: "#3e4e41",
          700: "#2f3a31",
          800: "#1f2720",
          900: "#101310"
},
      }
    }
  }
}
