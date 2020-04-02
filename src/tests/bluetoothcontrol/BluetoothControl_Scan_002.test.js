import { pluginDeactivate, pluginActivate, scanDevices } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Bluetooth Control - Scan 002',
  description: 'Check error message when scanning is performed while previous scan is in progress',
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
      description: 'Invoke Scan',
      test() {
        return scanDevices.call(this, 'LowEnergy', 10)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Scan does not start')
          return false
        }
      },
    },
    {
      description: 'Invoke Scan',
      test() {
        return scanDevices.call(this, 'LowEnergy', 10)
      },
      validate(res) {
        if (res.code == 12 && res.message == 'ERROR_INPROGRESS') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
