import { getPluginConfiguration, setPluginConfiguration } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Configuration - 001',
  description: 'Validate Plugin Configuration',
  steps: [
    {
      description: 'Get Plugin Configuration and validate the result',
      test() {
        return setPluginConfiguration.call(this, constants.deviceInfo, 'randomString')
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          this.$log('Configuration not set')
          return false
        }
      },
    },
    {
      description: 'Get Plugin Configuration and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.deviceInfo)
      },
      validate(res) {
        if (res == 'randomString') {
          //TODO - Currently not getting any response. Need to check how we can get response
          return true
        } else {
          this.$log('Configuration not available')
          return false
        }
      },
    },
  ],
}
