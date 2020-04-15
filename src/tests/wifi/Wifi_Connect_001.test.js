import { pluginDeactivate, pluginActivate, connectWifi } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Wifi Control - Connect 001',
  description: 'Check error message when connecting to a invalid Wifi network',
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
      description: 'Connect to invalid Wifi Network and validate error message',
      sleep: 5,
      test() {
        return connectWifi.call(this, 'invalidWifi')
      },
      validate(res) {
        if (res.code == 22 && res.message == 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
