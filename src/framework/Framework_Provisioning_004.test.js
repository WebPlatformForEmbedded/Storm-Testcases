import {
  getPluginInfo,
  pluginDeactivate,
  pluginActivate,
  putRequestForPlugin,
} from '../commonMethods/commonFunctions'
import constants from '../commonMethods/constants'

export default {
  title: 'Framework request provision stress test',
  description: 'Perform multiple device provision requests and see if it is still running',
  steps: [
    {
      description: 'Deactivating Provisioning and check whether deactivated or not',
      test: pluginDeactivate,
      params: constants.provisioningPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activating Provisioning Plugin and checking whether activated or not',
      test: pluginActivate,
      params: constants.provisioningPlugin,
      assert: 'activated',
    },
    {
      description: 'Get Provisioning Plugin Info',
      sleep: 5, //This sleep is to make sure that Provisioning plugin is activated
      test: getPluginInfo,
      params: constants.provisioningPlugin,
      validate(result) {
        let response = result.data
        if (response.id === undefined && response.status === undefined) {
          this.$log('Provisioning id or status is not present in response')
          return false
        }
        if (parseInt(response.status) === 0) return true
        else if (parseInt(response.status) > 0 && response.tokens.length > 0) return true
        else {
          this.$log('Provisioning tokens and status do not match')
          return false
        }
      },
    },
    {
      title: 'Repeat Provisioning multiple times',
      description: 'Request provisioning',
      repeat: 10,
      steps: [
        {
          description: 'Request provisioning',
          test: putRequestForPlugin,
          validate(res) {
            if (res.status !== 204) {
              return false
            }
            return true
          },
        },
      ],
    },
    {
      description: 'Check Provisioning Status',
      test: getPluginInfo,
      params: constants.provisioningPlugin,
      validate(result) {
        let response = result.data
        if (response.id === undefined && response.status === undefined) {
          this.$log('Provisioning id or status is not present in response')
          return false
        }
        if (parseInt(response.status) > 0 && response.tokens.length > 0) return true
        else {
          this.$log('Device is not provisioned')
          return false
        }
      },
    },
  ],
}
