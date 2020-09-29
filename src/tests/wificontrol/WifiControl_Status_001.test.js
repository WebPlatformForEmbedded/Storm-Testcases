import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { storeWifiConfig, getWifiStatus } from '../../commonMethods/wificontrol'

export default {
  title: 'Wifi Control - Status 001  ',
  description: 'Gets the status when No wifi is connected and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Gets Wifi Status when no Wifi is connected and validates the result',
      sleep: 5,
      test() {
        return getWifiStatus.call(this)
      },
      validate(res) {
        if (res.connected === '') {
          return true
        } else {
          throw new Error(`Wifi status is improper and the error is ${res}`)
        }
      },
    },
  ],
}
