import { pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Activate - 003',
  description: 'Activate Controller plugin and check framework behavior',
  plugin: [constants.controllerPlugin],
  steps: [
    {
      description: 'Activating Controller plugin and check error message',
      test() {
        return pluginActivate.call(this, constants.controllerPlugin)
      },
      validate(res) {
        if (res.code === 24 && res.message === 'ERROR_PRIVILIGED_REQUEST') {
          return true
        } else {
          throw new Error(
            'Proper error message is not shown when we try to activate Controller plugin'
          )
        }
      },
    },
  ],
}
