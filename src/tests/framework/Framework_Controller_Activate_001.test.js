import { pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Activate - 001',
  description: 'Activate plugin while activation is already in progress',
  steps: [
    {
      description: 'Activating DeviceInfo plugin while activation is in progress',
      test() {
        pluginActivate.call(this, constants.deviceInfo)
        return pluginActivate.call(this, constants.deviceInfo)
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
