import { pluginDeactivate } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Deactivate - 002',
  description: 'Deactivate invalid plugin and check framework behavior',
  steps: [
    {
      description: 'Deactivating invalid plugin and check error message',
      test() {
        return pluginDeactivate.call(this, constants.invalidPlugin)
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
