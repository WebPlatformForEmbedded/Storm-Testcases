import { getBluetoothDeviceInfo } from '../../commonMethods/bluetoothControl'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'

import constants from '../../commonMethods/constants'

export default {
  title: 'Bluetooth Control - Device 002',
  description: 'Check Bluetooth Control Device Info with invalid device and validate the error',
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
      description: 'Get Bluetooth Device info with invalid device and validate the error',
      sleep: 10,
      test() {
        return getBluetoothDeviceInfo.call(this, constants.invalidAddress)
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
