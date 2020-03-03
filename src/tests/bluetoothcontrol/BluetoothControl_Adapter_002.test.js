import {
  pluginDeactivate,
  pluginActivate,
  getBluetoothAdapterInfo,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

export default {
  title: 'Bluetooth Control Adapter  002',
  description: 'Check Bluetooth Control Adapter Info with invalid adapter and validate the error',
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
      description: 'Get Bluetooth Adapter info with invalid adapter and validate the error',
      sleep: 10,
      test() {
        return getBluetoothAdapterInfo.call(this, constants.invalidAddress)
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
