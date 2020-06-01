import { pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Activate - 002',
  description: 'Activate invalid plugin and check framework behavior',
  steps: [
    {
      description: 'Activating invalid plugin and check error message',
      test() {
        return pluginActivate.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            'Proper error message is not shown when we try to activate invalid plugin'
          )
        }
      },
    },
  ],
}
