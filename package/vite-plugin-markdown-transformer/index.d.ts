import { Plugin } from 'vite'
import {
  type Options,
  type PluginSimple,
  type PluginWithParams,
  type PluginWithOptions
} from 'markdown-it'
declare module 'vite-plugin-markdown-transformer' {
  export default function MarkdownTransformer(): Plugin
  export type MdPluginWithParams = { plugin: PluginWithParams; params?: any[] }
  export type MdPluginWithOptions = { plugin: PluginWithOptions; options?: any }
  export type PluginType =
    | PluginSimple
    | MdPluginWithParams
    | MdPluginWithOptions
  export type MarkdownTransformerOption = {
    matchTag?: string
    customClass?: string
    markdownItOptions?: Options
    plugins?: PluginType[]
  }
}
