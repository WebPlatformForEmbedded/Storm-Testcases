import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getZOrder, putOnTop } from '../../commonMethods/compositor'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

export default {
  title: 'Compositor Putontop Functionality - 001',
  description: 'Checks the putontop functionality of compositor plugin',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
      () => pluginDeactivate.call(this, constants.uxplugin),
      () => pluginDeactivate.call(this, constants.netFlixPlugin),
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.webKitBrowserPlugin),
      () => setWebKitUrl.call(this, constants.blankUrl),
      () => {
        return this.$thunder.api.call(constants.webKitBrowserPlugin, 'state', constants.resume)
      },
    ])
  },
  teardown() {
    pluginDeactivate.call(this, constants.youTubePlugin)
  },
  steps: [
    {
      description: 'Activate Cobalt Plugin and check suspended or not',
      test() {
        return pluginActivate.call(this, constants.youTubePlugin)
      },
      validate(res) {
        if (res === 'suspended') {
          return true
        } else {
          throw new Error('Cobalt Plugin not activated')
        }
      },
    },
    {
      description: 'Resume Cobalt Plugin and check resumed or not',
      sleep: 10,
      test() {
        return suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Cobalt Plugin not resumed')
        }
      },
    },
    {
      description: 'Put WebKit plugin on top',
      test() {
        return putOnTop.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('WebKit Browser Plugin not moved to top while executing putOnTop')
        }
      },
    },
    {
      description: 'Get Zorder and validate whether WebKitBrowser plugin is on top',
      sleep: 5,
      test() {
        return getZOrder.call(this)
      },
      validate() {
        let zorder = this.$data.read('zorder')
        if (zorder[0] == constants.webKitBrowserPlugin) {
          return true
        } else {
          throw new Error('WebKit Browser Plugin not moved to top')
        }
      },
    },
    {
      description: 'Put Cobalt plugin on top',
      test() {
        return putOnTop.call(this, constants.youTubePlugin)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Youtube Plugin not moved to top while executing putOnTop')
        }
      },
    },
    {
      description: 'Get Zorder and validate whether Cobalt plugin is on top',
      sleep: 5,
      test() {
        return getZOrder.call(this)
      },
      validate() {
        let zorder = this.$data.read('zorder')
        if (zorder[0] == constants.youTubePlugin) {
          return true
        } else {
          throw new Error('Youtube Plugin not moved to top')
        }
      },
    },
  ],
}
