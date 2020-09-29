import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { connectWifi, disconnectWifi } from '../../commonMethods/wificontrol'
import constants from '../../commonMethods/constants'

export default {
  title: 'Wifi Control - Disconnect 002',
  description: 'Check error message when disconnecting invalid Wifi network',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Disconnect to invalid Wifi Network and validate error message',
      sleep: 5,
      test() {
        return disconnectWifi.call(this, 'invalidWifi')
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
