import {
  pluginDeactivate,
  pluginActivate,
  setNetworkStatus,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'NetworkControl - Up Status 003',
  description: 'Set the Network Up status to True',
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
        return setNetworkStatus.call(this, 'eth0', 'false') //TODO - Network status cannot be set to false as the connection is lost.
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          this.$log('Cannot set network status')
          return false
        }
      },
    },
  ],
}
