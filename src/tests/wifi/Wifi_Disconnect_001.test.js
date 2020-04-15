import {
  pluginDeactivate,
  pluginActivate,
  disconnectWifi,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Wifi Control - Disconnect 001',
  description: 'Check error message when disconnecting to a invalid Wifi network',
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
      description: 'Disconnect invalid Wifi Network and validate error message',
      sleep: 5,
      test() {
        return disconnectWifi.call(this, 'invalidWifi')
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
