import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { suspendOrResumeUxPlugin } from '../../commonMethods/ux'
import { getZOrder, putBelow } from '../../commonMethods/compositor'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

export default {
  title: 'Compositor Putbelow Functionality - 001',
  description: 'Checks the putbelow functionality of compositor plugin',
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
      description: 'Deactivate Cobalt Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
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
      description: 'Activate Cobalt Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Cobalt Plugin and check resumed or not',
      test() {
        suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
    },
    {
      description: 'Put Cobalt plugin below UX plugin',
      sleep: 10,
      test() {
        return putBelow.call(this, constants.youTubePlugin, constants.uxplugin)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Result is not as expected')
          return false
        }
      },
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
          this.$log('Plugin not moved to below')
          return false
        }
      },
    },
    {
      description: 'Put UX plugin below Netflix plugin',
      test() {
        return putBelow.call(this, constants.uxplugin, constants.youTubePlugin)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Result is not as expected')
          return false
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
          this.$log('Plugin not moved to below')
          return false
        }
      },
    },
  ],
}
