import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  base:"https://github.com/AbdullahHishamK/Ecommerce.git",
  build: {
    chunkSizeWarningLimit: 1000 // Increase from 500 to 1000 KB
  }
})
