import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCompositorClients } from '../../commonMethods/compositor'
import { suspendOrResumeUxPlugin } from '../../commonMethods/ux'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

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
      description: 'Get Compositor Clients and validate the result',
      test() {
        return getCompositorClients.call(this)
      },
      validate(res) {
        if (res.indexOf(constants.youTubePlugin) !== -1 && res.indexOf(constants.uxplugin) !== -1) {
          return true
        } else {
          throw new Error('Clients list is incorrect and does not have expected plugins')
        }
      },
    },
  ],
}
