import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getBluetoothDeviceInfo, getBluetoothDevices } from '../../commonMethods/bluetoothControl'
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
        //TODO - Prompt the user with result and ask him to confirm the devices are available in the list.
        // If user says yes pass the test case. Store this device list in a variable
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
        //TODO - Prompt the user for which adapter he need info
        // and replace devicelist[0] with input
        return getBluetoothDeviceInfo.call(this, devicelist[0])
      },
      validate(result) {
        //TODO - Prompt the user to Check the information of the device with Yes and No
        // If he selects Yes pass the test
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
