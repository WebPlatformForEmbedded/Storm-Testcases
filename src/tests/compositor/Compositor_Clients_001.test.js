import { getCompositorClients } from '../../commonMethods/compositor'
import { suspendOrResumeUxPlugin } from '../../commonMethods/ux'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
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
      description: 'Get Compositor Clients and validate the result',
      test() {
        return getCompositorClients.call(this)
      },
      validate(res) {
        if (res.indexOf('Netflix') !== -1 && res.indexOf('UX') !== -1) {
          return true
        } else {
          this.$log('Clients list is incorrect')
          return false
        }
      },
    },
  ],
}
