import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getProvisioningPluginData, startProvisioning } from '../../commonMethods/provisioning'

export default {
  title: 'Framework request provision stress test',
  description: 'Perform multiple device provision requests and see if it is still running',
  plugin: [constants.provisioningPlugin],
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
      test() {
        return getProvisioningPluginData.call(this)
      },
      validate(response) {
        if (response.id === undefined && response.status === undefined) {
          throw new Error('Provisioning id or status is not present in response')
        }
        if (parseInt(response.status) === 0) return true
        else if (parseInt(response.status) > 0 && response.tokens.length > 0) return true
        else {
          throw new Error('Provisioning tokens and status do not match')
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
          test() {
            return startProvisioning.call(this)
          },
          assert: null,
        },
      ],
    },
    {
      description: 'Check Provisioning Status',
      test() {
        return getProvisioningPluginData.call(this)
      },
      validate(response) {
        if (response.id === undefined && response.status === undefined) {
          throw new Error('Provisioning id or status is not present in response')
        }
        if (parseInt(response.status) === 0) return true
        else if (parseInt(response.status) > 0 && response.tokens.length > 0) return true
        else {
          throw new Error('Device is not provisioned')
        }
      },
    },
  ],
}
