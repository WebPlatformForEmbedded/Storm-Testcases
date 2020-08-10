import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { flushNetworkAdapter } from '../../commonMethods/networkcontrol'

export default {
  title: 'NetworkControl - Flush 001',
  description: 'Check the Flush Functionality of Network Control Module',
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
      description: 'Invoke Flush',
      sleep: 5,
      test() {
        return flushNetworkAdapter.call(this, 'eth0')
      },
      validate(res) {
        //TODO - Update validation by confirming that flush happened
        if (res == null) {
          return true
        } else {
          throw new Error('Flush doesnt work')
        }
      },
    },
  ],
}
