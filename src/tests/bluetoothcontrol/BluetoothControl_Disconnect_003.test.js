import { disconnectBTDevice } from '../../commonMethods/bluetoothControl'
import baseTest from './BluetoothControl_Disconnect_001.test'

let btdevicelist
let deviceStateChangeListener
let scanCompleteListener

export default {
  title: 'Bluetooth Control - Disconnect 003',
  description:
    'Check the Disconnect Functionality of Bluetooth Control Module for device which is already disconnected',
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
      description:
        'Validate error message when already disconnected device is trying to disconnect again',
      sleep: 5,
      test() {
        return disconnectBTDevice.call(this, btdevicelist[0]) //TODO - btdevicelist[0] need to be replaced with the MAC of already disconnected device
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
