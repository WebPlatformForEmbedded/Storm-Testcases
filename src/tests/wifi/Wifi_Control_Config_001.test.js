import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getWifiConfigInfo } from '../../commonMethods/wifiControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Wifi Control - Config 001',
  description: 'Check error message when we get config info of a invalid Wifi network',
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
      description: 'Get invalid Wifi Config info and validate error message',
      sleep: 5,
      test() {
        return getWifiConfigInfo.call(this, 'invalidWifi')
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
