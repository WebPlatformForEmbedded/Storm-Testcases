import {
  pluginDeactivate,
  pluginActivate,
  reloadNetworkAdapter,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'NetworkControl - Reload 002',
  description:
    'Check the Reload Functionality of Network Control Module with invalid network interface',
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
      description: 'Invoke Reload with invalid Network interface',
      sleep: 5,
      test() {
        return reloadNetworkAdapter.call(this, constants.invalidAddress)
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
