import { flushNetworkAdapter } from '../../commonMethods/networkControl'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'NetworkControl - Flush 002',
  description:
    'Check the Flush Functionality of Network Control Module with invalid Network Interface',
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
      description: 'Invoke Flush with invalid network interface',
      sleep: 5,
      test() {
        return flushNetworkAdapter.call(this, constants.invalidAddress)
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
