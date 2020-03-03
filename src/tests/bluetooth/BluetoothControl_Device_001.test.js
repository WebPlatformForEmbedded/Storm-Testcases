import {
  pluginDeactivate,
  pluginActivate,
  getBluetoothDeviceInfo,
  getBluetoothDevices,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

let devicelist
export default {
  title: 'Bluetooth Control - Devices  001',
  description: 'Check Bluetooth Control Devices Info',
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
      description: 'Get Bluetooth Devices list',
      sleep: 10,
      test() {
        return getBluetoothDevices.call(this)
      },
      validate(result) {
        this.$data.write('devicelist', result)
        devicelist = this.$data.read('devicelist')
        if (result === undefined || result === null) {
          this.$log('Result does not have device list')
          return false
        } else {
          return true
        }
      },
    },
    {
      description: 'Get Bluetooth device info',
      sleep: 10,
      test() {
        return getBluetoothDeviceInfo.call(this, devicelist[0])
      },
      validate(result) {
        if (result === undefined || result === null) {
          this.$log('Device Info is not available')
          return false
        } else {
          return true
        }
      },
    },
  ],
}
