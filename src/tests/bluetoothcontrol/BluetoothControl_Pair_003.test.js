import { pairBTDevice } from '../../commonMethods/bluetoothControl'

import baseTest from './BluetoothControl_Pair_001.test'

let btdevicelist
let scanCompleteListener
let deviceStateChangeListener

export default {
  title: 'Bluetooth Control - Pair 003',
  description:
    'Check the Pair Functionality of Bluetooth Control Module with the device which is already paired',
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
        return pairBTDevice.call(this, btdevicelist[0]) //TODO - btdevicelist[0] need to be replaced with the user input given in previous testcase
      },
      validate(res) {
        if (res.code === 9 && res.message === 'ERROR_ALREADY_CONNECTED') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
