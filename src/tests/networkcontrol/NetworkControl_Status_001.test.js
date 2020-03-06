import {
  pluginDeactivate,
  pluginActivate,
  getNetworkStatus,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'NetworkControl - Up Status 001',
  description: 'Check the Network Up status',
  steps: [
    {
      description: 'Check if NetworkControl Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.networkControlPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if NetworkControl Plugin is started correctly',
      test: pluginActivate,
      params: constants.networkControlPlugin,
      assert: 'activated',
    },
    {
      description: 'Invoke Up to check network status',
      sleep: 5,
      test() {
        return getNetworkStatus.call(this, 'eth0')
      },
      validate(res) {
        if (res === true) {
          return true
        } else {
          this.$log('Network Status Not available')
          return false
        }
      },
    },
  ],
}
