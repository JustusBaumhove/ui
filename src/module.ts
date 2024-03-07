import { defu } from 'defu'
import { createResolver, defineNuxtModule, addComponentsDir, addImportsDir, addVitePlugin, addPlugin, installModule } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
import createTemplates from './templates'
import icons from './theme/icons'

export interface ModuleOptions {
  colors: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'ui',
    configKey: 'ui',
    compatibility: {
      nuxt: '^3.10.0'
    }
  },
  defaults: {
    colors: ['primary', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchia', 'pink', 'rose']
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.alias['#ui'] = resolve('./runtime')

    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, {
      primary: 'green',
      gray: 'cool',
      icons
    })

    createTemplates(options, nuxt)

    addVitePlugin(tailwindcss)

    await installModule('nuxt-icon')
    // await installModule('@nuxtjs/color-mode', { classSuffix: '' })

    addPlugin({
      src: resolve('./runtime/plugins/index')
    })

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'U',
      pathPrefix: false
    })

    addImportsDir(resolve('./runtime/composables'))
  }
})
