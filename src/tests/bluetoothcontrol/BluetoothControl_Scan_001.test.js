import {
  pluginDeactivate,
  pluginActivate,
  scanDevices,
  getBluetoothDevices,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener

export default {
  title: 'Bluetooth Control Scan 001',
  description: 'Check the Scan Functionality of Bluetooth Control Module',
  setup() {
    listener = this.$thunder.api.BluetoothControl.on('scancomplete', () => {
      this.$data.write('scancompleted', 'scancompleted') //TODO  Need to update this line
    })
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
            } else if (attempts > 1000) {
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
