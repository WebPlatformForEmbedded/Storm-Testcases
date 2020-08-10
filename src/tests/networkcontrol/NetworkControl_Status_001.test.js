import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getNetworkStatus } from '../../commonMethods/networkcontrol'

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
          throw new Error('Network Status Not available')
        }
      },
    },
  ],
}
