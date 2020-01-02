import {
  getProvisioningPluginData,
  pluginDeactivate,
  pluginActivate,
  startProvisioning,
  getPluginInfo,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix provisioning tests',
  repeat: 30,
  description: 'Validate if Framework does not crash if you start Netflix plugin repeatedly',
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
      assert: 'activated',
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
        return getPluginInfo.call(this, constants.netFlixPlugin)
      },
      validate(res) {
        if (res.data.esn !== undefined && res.data.esn !== '' && res.data.esn.length > 0)
          return true
        else {
          this.$log('Netflix does not have a ESN')
          return false
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
