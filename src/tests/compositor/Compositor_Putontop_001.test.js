import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { suspendOrResumeUxPlugin } from '../../commonMethods/ux'
import { getZOrder, putOnTop } from '../../commonMethods/compositor'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

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
      description: 'Activate Youtube Plugin and check suspended or not',
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
      description: 'Put Cobalt plugin on top',
      test: putOnTop,
      params: constants.youTubePlugin,
      assert: null,
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
          this.$log('Plugin not moved to top')
          return false
        }
      },
    },
  ],
}
