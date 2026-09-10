import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Semester-Project-2/',

  plugins: [
    tailwindcss(),
  ],

  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'home.html'),
        search: resolve(__dirname, 'search.html'),
        product: resolve(__dirname, 'product.html'),
        profile: resolve(__dirname, 'profile.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        createList: resolve(__dirname, 'create-list.html'),
        editProfile: resolve(__dirname, 'edit-profile.html'),
        history: resolve(__dirname, 'history.html'),
      },
    },
  },
})