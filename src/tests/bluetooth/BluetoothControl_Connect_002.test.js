import {
  pluginDeactivate,
  pluginActivate,
  connectBTDevice,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

export default {
  title: 'Bluetooth Control - Connect  002',
  description: 'Check the Connect Functionality with invalid Bluetooth device',
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
      description: 'Connect with the device',
      sleep: 5,
      test() {
        return connectBTDevice.call(this, constants.invalidAddress)
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
