import { disconnectBTDevice } from '../../commonMethods/commonFunctions'
import baseTest from './BluetoothControl_Connect_001.test'

let btdevicelist
let deviceStateChangeListener
let scanCompleteListener

export default {
  title: 'Bluetooth Control - Disconnect 001',
  description: 'Check the disconnect Functionality of Bluetooth Control Module',
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
      description: 'Disconnect with the device',
      sleep: 5,
      test() {
        //TODO - Prompt the user to select the device that need to be disconnected
        // and input(instead of btdevicelist[0]) that to the 'disconnectBTDevice'
        return disconnectBTDevice.call(this, btdevicelist[0])
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Disconnection doesnt happen')
          return false
        }
      },
    },
    {
      description: 'Check whether disconnecting is success',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (
              this.$data.read('address') === btdevicelist[0] && //TODO - btdevicelist[0] need to be replaced with the user input given in previous step
              this.$data.read('state') === 'Disconnected'
            ) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Disconnection is not success')
            }
          }, 1000)
        })
      },
    },
  ],
}
