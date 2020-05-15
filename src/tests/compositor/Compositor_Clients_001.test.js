import {
  pluginDeactivate,
  pluginActivate,
  suspendOrResumeUxPlugin,
  getCompositorClients,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Clients - 001',
  description: 'Gets the list of Clients',
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
      description: 'Deactivate Youtube Plugin and check deactivated or not',
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
      description: 'Activate Youtube Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'resumed',
    },
    {
      description: 'Get Compositor Clients and validate the result',
      test() {
        return getCompositorClients.call(this)
      },
      validate(res) {
        if (res.indexOf('Cobalt-graphics') !== -1 && res.indexOf('UX') !== -1) {
          return true
        } else {
          this.$log('Clients list is incorrect')
          return false
        }
      },
    },
  ],
}
