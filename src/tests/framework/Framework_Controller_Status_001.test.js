import { getPluginStatus } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Status - 001',
  description: 'Get status of invalid plugin',
  steps: [
    {
      description: 'Get status of invalid plugin and check error message',
      test() {
        return getPluginStatus.call(this, constants.invalidPlugin)
      },
      validate(res) {
        this.$log('redevice', res)
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
