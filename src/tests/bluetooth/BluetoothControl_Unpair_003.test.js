import { unpairBTDevice } from '../../commonMethods/commonFunctions'

import baseTest from './BluetoothControl_Unpair_001.test'

let btdevicelist
let scanCompleteListener
let deviceStateChangeListener

export default {
  title: 'Bluetooth Control - Unpair 003',
  description:
    'Check the Unpair Functionality  of Bluetooth Control Module with the device which is already Unpaired',
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
      description: 'Unpair the device which is already unpaired and validate error message',
      sleep: 5,
      test() {
        return unpairBTDevice.call(this, btdevicelist[0]) //TODO - Replace btdevicelist[0] with the device address that is used to unpair in the baseTest
      },
      validate(res) {
        if (res.code === 36 && res.message === 'ERROR_ALREADY_RELEASED') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
