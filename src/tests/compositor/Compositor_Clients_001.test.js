import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCompositorClients } from '../../commonMethods/compositor'
import { suspendOrResumeUxPlugin } from '../../commonMethods/ux'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

export default {
  title: 'Compositor Clients - 001',
  description: 'Gets the list of Clients',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
      () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
      () => pluginDeactivate.call(this, constants.uxplugin),
      () => pluginDeactivate.call(this, constants.youTubePlugin),
    ])
  },
  teardown() {
    pluginDeactivate.call(this, constants.youTubePlugin)
  },
  steps: [
    {
      description: 'Activate UX Plugin and check suspended or not',
      test: pluginActivate,
      params: constants.uxplugin,
      assert: 'suspended',
    },
    {
      description: 'Resume UX Plugin and check resumed or not',
      test() {
        return suspendOrResumeUxPlugin.call(this, constants.resume)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Ux Plugin not resumed')
        }
      },
    },
    {
      description: 'Activate Youtube Plugin and check suspended or not',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Youtube Plugin and check resumed or not',
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
      description: 'Get Compositor Clients and validate the result',
      sleep: 10,
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
