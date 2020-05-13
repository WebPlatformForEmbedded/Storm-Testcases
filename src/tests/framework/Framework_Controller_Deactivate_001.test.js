import { pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Deactivate - 001',
  description: 'Deactivate plugin while deactivation is already in progress',
  steps: [
    {
      description: 'Deactivating DeviceInfo plugin while deactivation is in progress',
      test() {
        pluginDeactivate.call(this, constants.deviceInfo)
        return pluginDeactivate.call(this, constants.deviceInfo)
      },
      validate(res) {
        if (res.code === 12 && res.message === 'ERROR_INPROGRESS') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
