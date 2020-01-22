import {
  getPluginInfo,
  pluginDeactivate,
  pluginActivate,
  restartFramework,
} from './commonMethods/commonFunctions'
import constants from './commonMethods/constants'

export default {
  title: 'Framework provision test 001',
  description: 'Tests if the Framework provision module works',
  teardown: restartFramework,
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
        this.$data.write('pluginData', result)
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
  validate() {
    let resp = this.$data.read('pluginData')
    let response = resp.data
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
