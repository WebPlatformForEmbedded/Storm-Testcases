import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { scanWifi } from '../../commonMethods/wificontrol'

export default {
  title: 'Wifi Control Scan- 001  ',
  description: 'Scans Wifi and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Scans Wifi and validates the result',
      sleep: 5,
      test() {
        return scanWifi.call(this)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Wifi scan is not started and the error is ${res}`)
        }
      },
    },
  ],
}
