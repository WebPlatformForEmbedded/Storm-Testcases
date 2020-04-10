import { getPluginStatus } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Status - 003',
  description: 'Get status of multiple plugins plugin',
  steps: [
    {
      description: 'Get status of webkitbrowser plugin and validate the result',
      test() {
        return getPluginStatus.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res !== undefined && res !== null) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
    {
      description: 'Get status of deviceInfo plugin and validate the result',
      test() {
        return getPluginStatus.call(this, constants.deviceInfo)
      },
      validate(res) {
        if (res !== undefined && res !== null) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
