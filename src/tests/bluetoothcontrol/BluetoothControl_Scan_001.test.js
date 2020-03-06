import {
  pluginDeactivate,
  pluginActivate,
  scanDevices,
  getBluetoothDevices,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let scanCompleteListener

export default {
  title: 'Bluetooth Control - Scan 001',
  description: 'Check the Scan Functionality of Bluetooth Control Module',
  setup() {
    scanCompleteListener = this.$thunder.api.BluetoothControl.on('scancomplete', () => {
      this.$data.write('scancompleted', 'scancompleted')
    })
  },
  teardown() {
    scanCompleteListener.dispose()
  },
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
      sleep: 5,
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
      description: 'Check whether scanning is success',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('scancompleted') === 'scancompleted') {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Scanning not completed')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Get scan results',
      sleep: 10,
      test() {
        return getBluetoothDevices.call(this)
      },
      validate(result) {
        //TODO - Prompt the user with result and ask him to confirm the devices available are in the list.
        // If user says yes pass the test case. Store this device list in a variable
        if (result === undefined || result.length === 0) {
          this.$log('Result does not have device list')
          return false
        } else {
          return true
        }
      },
    },
  ],
}
