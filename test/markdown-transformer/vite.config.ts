import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import markdownTransformer from '../../package/vite-plugin-markdown-transformer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    markdownTransformer({
      customClass: 'markdown-body',
      matchTag: 'g-markdown',
      markdownItOptions: {
        typographer: true
      },
      plugins: [
        {
          plugin: (md, options) => {
            console.log(options)
          },
          options: {
            number: [1, 2, 3]
          }
        }
      ]
    })
  ]
})
