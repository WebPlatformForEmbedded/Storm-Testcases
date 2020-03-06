import { connectBTDevice } from '../../commonMethods/commonFunctions'
import baseTest from './BluetoothControl_Pair_001.test'

let btdevicelist
let deviceStateChangeListener
let scanCompleteListener

export default {
  title: 'Bluetooth Control - Connect  001',
  description: 'Check the Connect Functionality of Bluetooth Control Module',
  setup() {
    scanCompleteListener = this.$thunder.api.BluetoothControl.on('scancomplete', () => {
      this.$data.write('scancompleted')
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
      description: 'Connect with the device',
      sleep: 5,
      test() {
        //TODO - Prompt the user to select the device that need to be connected
        // and input(instead of btdevicelist[0]) that to the 'connectBTDevice'
        return connectBTDevice.call(this, btdevicelist[0])
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Connecting doesnt happen')
          return false
        }
      },
    },
    {
      description: 'Check whether connecting is success',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (
              this.$data.read('address') === btdevicelist[0] && //TODO - btdevicelist[0] need to be replaced with the user input given in previous step
              this.$data.read('state') === 'Connected'
            ) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Connecting does not happen')
            }
          }, 1000)
        })
      },
    },
  ],
}
