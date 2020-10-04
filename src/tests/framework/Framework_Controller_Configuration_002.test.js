import constants from '../../commonMethods/constants'
import { getPluginConfiguration } from '../../commonMethods/controller'

export default {
  title: 'Framework Controller Configuration - 002',
  description: 'Get plugin Configuration for invalid Plugin and check framework behavior',
  steps: [
    {
      description: 'Get invalid Plugin Configuration and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            `Proper error message is not shown while getting Configuration for invalid plugin and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
