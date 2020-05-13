import { unpairBTDevice } from '../../commonMethods/bluetoothControl'
import baseTest from './BluetoothControl_Pair_001.test'

let btdevicelist
let scanCompleteListener
let deviceStateChangeListener

export default {
  title: 'Bluetooth Control - Unpair 001',
  description: 'Check the Unpair Functionality of Bluetooth Control Module',
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
      description: 'Unpair the device',
      sleep: 5,
      test() {
        //TODO - Prompt the user to select the device that need to be paired
        // and input(instead of btdevicelist[0]) that to the 'unpairBTDevice'
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
              this.$data.read('address') === btdevicelist[0] && //TODO - btdevicelist[0] need to be replaced with the user input given in previous step
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
