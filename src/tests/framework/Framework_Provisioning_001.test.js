import { getProvisioningPluginData } from '../../commonMethods/provisioning'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework provision test 001',
  description: 'Tests if the Framework provision module works',
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
      description: 'Get Provisioning status and Check if response is a JSON response',
      sleep: 5,
      test() {
        return getProvisioningPluginData.call(this)
      },
      validate(res) {
        this.$data.write('pluginInfo', res)
        return this.$expect(res).to.be.object() === true
      },
    },
  ],
  validate() {
    let response = this.$data.read('pluginInfo')
    if (response.id === undefined) {
      this.$log('Provisioning id is not present')
      return false
    }
    if (response.status === undefined || isNaN(parseInt(response.status)) === true) {
      this.$log('Provisioning status is not provided')
      return false
    }
    return true
  },
}
