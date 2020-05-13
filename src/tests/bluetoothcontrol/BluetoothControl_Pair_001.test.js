import { pairBTDevice } from '../../commonMethods/bluetoothControl'

import baseTest from './BluetoothControl_Scan_001.test'

let btdevicelist
let scanCompleteListener
let deviceStateChangeListener

export default {
  title: 'Bluetooth Control - Pair  001',
  description: 'Check the Pair Functionality of Bluetooth Control Module',
  setup() {
    scanCompleteListener = this.$thunder.api.BluetoothControl.on('scancomplete', () => {
      this.$data.write('scancompleted', 'scancompleted')
    })
    deviceStateChangeListener = this.$thunder.api.BluetoothControl.on('devicestatechange', data => {
      this.$data.write('address', data.address)
      this.$data.write('state', data.state)
    })
  },
  teardown() {
    scanCompleteListener.dispose()
    deviceStateChangeListener.dispose()
  },
  steps: [
    baseTest,
    {
      description: 'Pair with the device',
      sleep: 5,
      test() {
        //TODO - Prompt the user to select the device that need to be paired
        // and input(instead of btdevicelist[0]) that to the 'pairBTDevice'
        return pairBTDevice.call(this, btdevicelist[0])
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Pairing not started')
          return false
        }
      },
    },
    {
      description: 'Check whether pairing is success',
      sleep: 5,
      test() {
        //TODO - Prompt the user to press on the button in the Bluetooth Device to pair with 1 minute timeout
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (
              this.$data.read('address') === btdevicelist[0] && //TODO - btdevicelist[0] need to be replaced with the user input given in previous step
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
  ],
}
