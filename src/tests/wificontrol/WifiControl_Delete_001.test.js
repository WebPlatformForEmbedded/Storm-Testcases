import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { deleteWifiConfig } from '../../commonMethods/wificontrol'

export default {
  title: 'Wifi Control Config Delete - 001  ',
  description: 'Deleted Wifi Config and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Deletes Wifi Config and validates the result',
      sleep: 5,
      test() {
        return deleteWifiConfig.call(this, 'Sandeep Sharma')
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Wifi Config not deleted and the error is ${res}`)
        }
      },
    },
  ],
}
