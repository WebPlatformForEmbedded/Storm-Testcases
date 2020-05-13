import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { scanWifi } from '../../commonMethods/wifiControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Wifi Control - Scan 001',
  description: 'Check error message when Wifi scan is performed while previous scan is in progress',
  steps: [
    {
      description: 'Check if Wifi Control Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.wifiControlPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Wifi Control Plugin is started correctly',
      test: pluginActivate,
      params: constants.wifiControlPlugin,
      assert: 'activated',
    },
    {
      description: 'Invoke Wifi Scan',
      sleep: 5,
      test() {
        return scanWifi.call(this)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Scan does not start')
          return false
        }
      },
    },
    {
      description: 'Invoke Wifi Scan',
      test() {
        return scanWifi.call(this)
      },
      validate(res) {
        if (res.code == 12 && res.message == 'ERROR_INPROGRESS') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
