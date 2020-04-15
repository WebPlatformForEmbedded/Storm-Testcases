import {
  pluginDeactivate,
  pluginActivate,
  getNetworkInformation,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'NetworkControl - NetworkInfo 002',
  description:
    'Check the Network Information of Network Control Module with invalid network interface',
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
      description: 'Invoke Network to get Network Info with invalid network interface',
      sleep: 5,
      test() {
        return getNetworkInformation.call(this, constants.invalidAddress)
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