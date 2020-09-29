import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { scanWifi } from '../../commonMethods/wificontrol'

export default {
  title: 'Wifi Control Scan- 002  ',
  description: 'Scans Wifi immediately after first scan is started and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Scans Wifi immediately after first scan is started and validate the result',
      sleep: 5,
      test() {
        scanWifi.call(this)
        return scanWifi.call(this)
      },
      validate(res) {
        if (res.code === 12 && res.message === 'ERROR_INPROGRESS') {
          return true
        } else {
          throw new Error(`Improper error shown and error is ${res}`)
        }
      },
    },
  ],
}
