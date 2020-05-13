import { connectBTDevice } from '../../commonMethods/bluetoothControl'
import baseTest from './BluetoothControl_Connect_001.test'

let btdevicelist
let deviceStateChangeListener
let scanCompleteListener

export default {
  title: 'Bluetooth Control - Connect  003',
  description:
    'Check the Connect Functionality of Bluetooth Control Module with the device which is already connected',
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
        'Validate error message when already connected device is trying to connect again',
      sleep: 5,
      test() {
        return connectBTDevice.call(this, btdevicelist[0]) //TODO - btdevicelist[0] need to be replaced with the MAC of already connected device
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
