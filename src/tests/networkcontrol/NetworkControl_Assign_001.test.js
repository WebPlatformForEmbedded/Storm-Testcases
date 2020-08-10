import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { assignNetworkAdapter } from '../../commonMethods/networkcontrol'

export default {
  title: 'NetworkControl - Assign 001',
  description: 'Check the Assign Functionality of Network Control Module',
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
      description: 'Invoke Assign',
      sleep: 5,
      test() {
        return assignNetworkAdapter.call(this, 'eth0')
      },
      validate(res) {
        //TODO - Update validation by confirming that assign happened
        console.log('res is', res)
        if (res === null) {
          return true
        } else {
          throw new Error('Assign doesnt work')
        }
      },
    },
  ],
}
