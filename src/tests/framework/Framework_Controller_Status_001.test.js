import constants from '../../commonMethods/constants'
import { getPluginStatus } from '../../commonMethods/controller'

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
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            'Proper error message is not shown while getting plugin status for invalid plugin'
          )
        }
      },
    },
  ],
}
