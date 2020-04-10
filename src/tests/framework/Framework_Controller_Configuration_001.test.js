import { getPluginConfiguration } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Configuration - 001',
  description: 'Validate Plugin Configuration',
  steps: [
    {
      description: 'Get Plugin Configuration and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res !== undefined && res !== null) {
          return true
        } else {
          this.$log('Configuration not available')
          return false
        }
      },
    },
  ],
}
