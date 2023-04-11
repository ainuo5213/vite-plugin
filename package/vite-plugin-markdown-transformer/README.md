### 简介

这是一个将`.vue`文件中，带有预设标签例如`<markdown></markdown>`内的内容替换为 html 的形式显示 markdown 语法的 vite 插件

### 使用方法

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { markdownTransformer } from '@ainuo-utils/vite-plugin-markdown-transformer'

export default defineConfig({
  plugins: [
    vue(),
    markdownTransformer({
      customClass: 'markdown-body', // 自定义markdown容器的类名
      matchTag: 'g-markdown', // 需要替换的标签
      markdownItOptions: {
        // markdown-it的option
        typographer: true
      },
      plugins: [] // markdown-it的插件
    })
  ]
})
```

### 如何做 markdown 样式？

1. 在项目中安装对应主题的样式类库

2. 修改默认的 markdown 容器类名
