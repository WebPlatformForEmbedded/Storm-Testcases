import {
  pluginDeactivate,
  pluginActivate,
  assignNetworkAdapter,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

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
        return assignNetworkAdapter().call(this, 'eth0')
      },
      validate(res) {
        //TODO - Update validation by confirming that assign happened
        if (res == null) {
          return true
        } else {
          this.$log('Assign doesnt work')
          return false
        }
      },
    },
  ],
}
