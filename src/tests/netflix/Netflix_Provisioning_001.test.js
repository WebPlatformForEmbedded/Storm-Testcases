import {
  getProvisioningPluginData,
  pluginDeactivate,
  pluginActivate,
  startProvisioning,
  getNetflixPluginEsnInfo,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix provisioning tests',
  description: 'Validate if the device is correctly provisioned for Netflix',
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
          this.$log('Provisioning id or status is not present in response')
          return false
        }
        if (parseInt(response.status) === 0) return true
        else if (parseInt(response.status) > 0 && response.tokens && response.tokens.length > 0) {
          if (response.tokens.indexOf('netflix') >= 0) {
            return true
          }
        } else {
          this.$log('Device is not provisioned')
          return false
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
          this.$log('Netflix does not have a ESN')
          return false
        }
      },
    },
  ],
}
