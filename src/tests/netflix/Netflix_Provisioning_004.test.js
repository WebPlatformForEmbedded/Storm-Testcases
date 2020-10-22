import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getProvisioningPluginData, startProvisioning } from '../../commonMethods/provisioning'
import { getNetflixPluginEsnInfo } from '../../commonMethods/netflix'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix provisioning tests',
  repeat: 30,
  description: 'Validate if Framework does not crash if you start Netflix plugin repeatedly',
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
      description: 'Activate Provisioning Plugin',
      test: pluginActivate,
      params: constants.provisioningPlugin,
      assert: 'resumed',
    },
    {
      description: 'Start provisioning',
      test() {
        return startProvisioning.call(this)
      },
      assert: null,
    },
    {
      description: 'Check Provisioning Status',
      sleep: 5,
      test() {
        return getProvisioningPluginData.call(this)
      },
      validate(response) {
        if (response.id === undefined && response.status === undefined) {
          throw new Error('Provisioning id or status is not present in response')
        }
        if (parseInt(response.status) === 0) return true
        else if (parseInt(response.status) > 0 && response.tokens && response.tokens.length > 0) {
          if (response.tokens.indexOf('netflix') >= 0) {
            return true
          }
        } else {
          throw new Error('Device is not provisioned')
        }
      },
    },
    {
      description: 'Start Netflix Plugin',
      test: pluginActivate,
      params: constants.netFlixPlugin,
    },
    {
      description: 'Check if Netflix has a valid ESN',
      sleep: 5,
      test() {
        return getNetflixPluginEsnInfo.call(this)
      },
      validate(res) {
        if (res.result !== undefined && res.result !== '' && res.result.length > 0) return true
        else {
          throw new Error('Netflix does not have a ESN')
        }
      },
    },
    {
      description: 'Stop Netflix Plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
  ],
}
