import {
  pluginDeactivate,
  pluginActivate,
  unpairBTDevice,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

export default {
  title: 'Bluetooth Control Unpair  002',
  description: 'Check the Unpair Functionality of Bluetooth Control Module with Invalid MAC',
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
      description: 'Unpair with the device with invalid MAC and check error message',
      sleep: 5,
      test() {
        return unpairBTDevice.call(this, constants.invalidAddress)
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
