import { Plugin } from 'vite'
import MarkdownIt, {
  type Options,
  type PluginSimple,
  type PluginWithParams,
  type PluginWithOptions
} from 'markdown-it'
export type MdPluginWithParams = { plugin: PluginWithParams; params?: any[] }
export type MdPluginWithOptions = { plugin: PluginWithOptions; options?: any }
export type PluginType = PluginSimple | MdPluginWithParams | MdPluginWithOptions
export type MarkdownTransformerOption = {
  matchTag?: string
  customClass?: string
  markdownItOptions?: Options
  plugins?: PluginType[]
}
const defaultMatchTag = 'markdown'
const defaultCustomClass = 'vite-plugin-markdown-transform__wrapper'
export function markdownTransformer(
  option: MarkdownTransformerOption = {
    matchTag: defaultMatchTag,
    customClass: defaultCustomClass,
    plugins: []
  }
): Plugin {
  const regText = `<${
    option.matchTag || defaultMatchTag
  }>(?<content>[\\s\\S]*?)<\/markdown>`
  const markdownTagReg = new RegExp(regText, 'g')
  const markdownContent = new RegExp(regText)
  const vueFileRegex = /\.vue$/
  const md = new MarkdownIt(option.markdownItOptions || {})
  option.plugins &&
    option.plugins.forEach(r => {
      if (typeof r === 'function') {
        md.use(r)
      } else {
        md.use(
          r.plugin,
          (r as unknown as MdPluginWithParams).params ||
            (r as unknown as MdPluginWithOptions).options
        )
      }
    })
  const transformMarkdown = (content: string) => {
    return `
    <section class="${option.customClass || defaultCustomClass}">${md.render(
      content
    )}
    </section>
    `
  }

  return {
    name: 'vite-plugin-markdown-transfomer',
    enforce: 'pre',
    transform(code, id, options) {
      if (vueFileRegex.test(id) && markdownTagReg.test(code)) {
        const mdList = code.match(markdownTagReg)
        if (mdList && mdList.length) {
          let transformCode = code
          mdList.forEach(r => {
            transformCode = transformCode.replace(
              r,
              transformMarkdown(r.match(markdownContent)![1].trim())
            )
          })

          return transformCode
        }
      }

      return code
    }
  }
}
