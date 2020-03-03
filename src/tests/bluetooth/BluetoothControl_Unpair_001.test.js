import {
  pluginDeactivate,
  pluginActivate,
  scanDevices,
  getBluetoothDevices,
  pairBTDevice,
  unpairBTDevice,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

let btdevicelist
let listener

export default {
  title: 'Bluetooth Control Pair  001',
  description: 'Check the Pair Functionality of Bluetooth Control Module',
  setup() {
    listener = this.$thunder.api.BluetoothControl.on('devicestatechange', data => {
      this.$data.write('address', data.address)
      this.$data.write('state', data.state)
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
      description: 'Get scan results',
      sleep: 10,
      test() {
        return getBluetoothDevices.call(this)
      },
      validate(result) {
        this.$data.write('btdevicelist', result)
        btdevicelist = this.$data.read('btdevicelist')
        if (result === undefined || result === null) {
          this.$log('Result does not have device list')
          return false
        } else {
          return true
        }
      },
    },
    {
      description: 'Pair with the device',
      sleep: 5,
      test() {
        return pairBTDevice.call(this, btdevicelist[0])
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Pairing doesnt happen')
          return false
        }
      },
    },
    {
      description: 'Check whether pairing is success',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (
              this.$data.read('address') === btdevicelist[0] &&
              this.$data.read('state') === 'Paired'
            ) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Pairing does not happen')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Unpair with the device',
      sleep: 5,
      test() {
        return unpairBTDevice.call(this, btdevicelist[0])
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Unpairing doesnt happen')
          return false
        }
      },
    },
    {
      description: 'Check whether unpairing is success',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (
              this.$data.read('address') === btdevicelist[0] &&
              this.$data.read('state') === 'Unpaired'
            ) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Unpairing does not happen')
            }
          }, 1000)
        })
      },
    },
  ],
}
