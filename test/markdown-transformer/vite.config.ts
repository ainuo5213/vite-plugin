import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { markdownTransformer } from '@ainuo-utils/vite-plugin-markdown-transformer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    markdownTransformer({
      customClass: 'test',
      matchTag: 'g-markdown'
    })
  ]
})
