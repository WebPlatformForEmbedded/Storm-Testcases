import { reloadNetworkAdapter } from '../../commonMethods/networkControl'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'NetworkControl - Reload 001',
  description: 'Check the Reload Functionality of Network Control Module',
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
      description: 'Invoke Reload',
      sleep: 5,
      test() {
        return reloadNetworkAdapter.call(this, 'eth0')
      },
      validate(res) {
        //TODO - Update validation by confirming that reload happened
        if (res == null) {
          return true
        } else {
          this.$log('Reload doesnt work')
          return false
        }
      },
    },
  ],
}
