import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getZOrder, putBelow } from '../../commonMethods/compositor'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

export default {
  title: 'Compositor Putbelow Functionality - 001',
  description: 'Checks the putbelow functionality of compositor plugin',
  plugin: [
    constants.compositorPlugin,
    constants.webKitBrowserPlugin,
    constants.uxplugin,
    constants.youTubePlugin,
  ],
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
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
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
      description: 'Put Cobalt plugin below WebKitBrowser plugin',
      sleep: 10,
      test() {
        return putBelow.call(this, constants.webKitBrowserPlugin, constants.youTubePlugin)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Cobalt plugin not put below WebKit browser plugin ')
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
          throw new Error('Plugin not moved to below')
        }
      },
    },
    {
      description: 'Put WebKit Browser plugin below Youtube plugin',
      test() {
        return putBelow.call(this, constants.youTubePlugin, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Webkitbrowser not put below Youtube Plugin')
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
          throw new Error('Webkitbrowser Plugin not moved to below')
        }
      },
    },
  ],
}
