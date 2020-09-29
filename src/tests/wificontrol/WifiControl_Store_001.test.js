import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { storeWifiConfig } from '../../commonMethods/wificontrol'

export default {
  title: 'Wifi Control Config Store - 001  ',
  description: 'Stores Wifi Config and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Stores Wifi Config and validates the result',
      sleep: 5,
      test() {
        return storeWifiConfig.call(this)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Wifi Config not stored and the error is ${res}`)
        }
      },
    },
  ],
}
