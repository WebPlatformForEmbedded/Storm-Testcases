import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getBluetoothDevices } from '../../commonMethods/bluetoothControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Bluetooth Control Devices  001',
  description: 'Check Bluetooth Control Device list',
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
      description: 'Get Bluetooth Device list',
      sleep: 10,
      test() {
        return getBluetoothDevices.call(this)
      },
      validate(result) {
        //TODO - Prompt the user with result and ask him to confirm the devices are available in the list.
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
