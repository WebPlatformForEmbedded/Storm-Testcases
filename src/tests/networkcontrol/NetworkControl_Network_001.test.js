import {
  pluginDeactivate,
  pluginActivate,
  getNetworkInformation,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'NetworkControl - NetworkInfo 001',
  description: 'Check the Network Information of Network Control Module',
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
      description: 'Invoke Network to get Network Info',
      sleep: 5,
      test() {
        return getNetworkInformation.call(this, 'eth0')
      },
      validate(res) {
        if (
          res.interface != null &&
          res.mode != null &&
          res.address != null &&
          res.mask != null &&
          res.gateway != null &&
          res.broadcast != null
        ) {
          return true
        } else {
          this.$log('Network Info Not available')
          return false
        }
      },
    },
  ],
}
