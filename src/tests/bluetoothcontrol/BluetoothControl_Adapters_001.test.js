import {
  pluginDeactivate,
  pluginActivate,
  getBluetoothAdapters,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

export default {
  title: 'Bluetooth Control Adapters  001',
  description: 'Check Bluetooth Control Adapter list',
  steps: [
    {
      description: 'Check if Bluetooth Control Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.bluetoothControlPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Bluetooth Control Plugin is started correctly',
      test: pluginActivate,
      params: constants.bluetoothControlPlugin,
      assert: 'activated',
    },
    {
      description: 'Get Bluetooth Adapter list',
      sleep: 10,
      test() {
        return getBluetoothAdapters.call(this)
      },
      validate(result) {
        //TODO - Prompt the user with result and ask him to confirm the adapters are available in the list.
        // If user says yes pass the test case.
        if (result === undefined || result === null) {
          this.$log('Result does not have adapter list')
          return false
        } else {
          return true
        }
      },
    },
  ],
}
