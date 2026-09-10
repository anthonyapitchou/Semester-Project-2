import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Semester-Project-2/',
  plugins: [
    tailwindcss(),
  ],
})