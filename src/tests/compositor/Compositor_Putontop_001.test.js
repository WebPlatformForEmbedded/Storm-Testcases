import { putOnTop, getZOrder } from '../../commonMethods/compositor'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import { suspendOrResumeUxPlugin } from '../../commonMethods/ux'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Putontop Functionality - 001',
  description: 'Checks the putontop functionality of compositor plugin',
  steps: [
    {
      description: 'Deactivate UX Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.uxplugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivate Webkitbrowser Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivate Netflix Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate UX Plugin and check activated or not',
      test: pluginActivate,
      params: constants.uxplugin,
      assert: 'suspended',
    },
    {
      description: 'Resume UX Plugin and check resumed or not',
      test() {
        suspendOrResumeUxPlugin.call(this, constants.resume)
      },
    },
    {
      description: 'Activate Netflix Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      description: 'Put UX plugin on top',
      test: putOnTop,
      params: constants.uxplugin,
      assert: null,
    },
    {
      description: 'Get Zorder and validate whether UX plugin is on top',
      sleep: 5,
      test() {
        return getZOrder.call(this)
      },
      validate() {
        let zorder = this.$data.read('zorder')
        if (zorder[0] == constants.uxplugin) {
          return true
        } else {
          this.$log('Plugin not moved to top')
          return false
        }
      },
    },
    {
      description: 'Put Netflix plugin on top',
      test: putOnTop,
      params: constants.netFlixPlugin,
      assert: null,
    },
    {
      description: 'Get Zorder and validate whether Netflix plugin is on top',
      sleep: 5,
      test() {
        return getZOrder.call(this)
      },
      validate() {
        let zorder = this.$data.read('zorder')
        if (zorder[0] == constants.netFlixPlugin) {
          return true
        } else {
          this.$log('Plugin not moved to top')
          return false
        }
      },
    },
  ],
}
