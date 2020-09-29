import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getWifiNetworks } from '../../commonMethods/wificontrol'

export default {
  title: 'Wifi Control - Networks 001  ',
  description: 'Get Wifi Networks and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Gets Wifi Networks and validates the result',
      sleep: 5,
      test() {
        return getWifiNetworks.call(this)
      },
      validate(res) {
        console.log(res[0])
        if (res != null) {
          return true
        } else {
          throw new Error(`Wifi is not available and data is empty and error is ${res}`)
        }
      },
    },
  ],
}
