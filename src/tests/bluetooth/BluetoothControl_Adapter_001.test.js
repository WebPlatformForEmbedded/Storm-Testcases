import {
  pluginDeactivate,
  pluginActivate,
  getBluetoothAdapters,
  getBluetoothAdapterInfo,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

let adapterList

export default {
  title: 'Bluetooth Control Adapter  001',
  description: 'Check Bluetooth Control Adapter Info',
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
      description: 'Get Bluetooth Adapter list',
      sleep: 10,
      test() {
        return getBluetoothAdapters.call(this)
      },
      validate(result) {
        this.$data.write('adapterList', result)
        adapterList = this.$data.read('adapterList')
        this.$log('adapter list is ===========>', adapterList)
        if (result === undefined || result === null) {
          this.$log('Result does not have adapter list')
          return false
        } else {
          return true
        }
      },
    },
    {
      description: 'Get Bluetooth Adapter info',
      sleep: 10,
      test() {
        return getBluetoothAdapterInfo.call(this, adapterList[0])
      },
      validate(result) {
        if (result === undefined || result === null) {
          this.$log('Adapter Info is not available')
          return false
        } else {
          return true
        }
      },
    },
  ],
}