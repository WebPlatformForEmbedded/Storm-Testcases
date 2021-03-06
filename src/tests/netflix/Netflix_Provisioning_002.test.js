import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getNetflixPluginEsnInfo } from '../../commonMethods/netflix'
import { startProvisioning } from '../../commonMethods/provisioning'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix provisioning tests',
  description: 'Validate if Netflix can start without provisioning',
  plugin: [constants.netFlixPlugin],
  steps: [
    {
      description: 'Stop Provisioning',
      test: pluginDeactivate,
      params: constants.provisioningPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Stop NetFlix plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Start Netflix Plugin',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      description: 'Check if Netflix is started without a valid ESN (screen stays blank)',
      sleep: 5,
      test() {
        return getNetflixPluginEsnInfo.call(this)
      },
      validate(res) {
        if (res.result !== undefined && res.result === '' && res.result.length === 0) {
          return true
        } else {
          throw new Error('Expected Netflix to not have an ESN, yet it does')
        }
      },
    },
    {
      description: 'Stop NetFlix plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Start provisioning',
      test() {
        return startProvisioning.call(this)
      },
      assert: null,
    },
  ],
}
