import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { requestNetworkAdapter } from '../../commonMethods/networkcontrol'

export default {
  title: 'NetworkControl - Request 001',
  description: 'Check the Request Functionality of Network Control Module',
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
      description: 'Invoke Request',
      sleep: 5,
      test() {
        return requestNetworkAdapter.call(this, 'eth0')
      },
      validate(res) {
        //TODO - Update validation by confirming that Request happened
        if (res == null) {
          return true
        } else {
          throw new Error('Request doesnt work')
        }
      },
    },
  ],
}
