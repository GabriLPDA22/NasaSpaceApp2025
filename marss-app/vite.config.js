import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 👇 Esta es la línea que tienes que añadir
  base: '/NasaSpaceApp2025/',
})