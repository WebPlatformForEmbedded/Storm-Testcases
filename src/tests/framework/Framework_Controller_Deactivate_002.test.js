import constants from '../../commonMethods/constants'
import { pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Framework Controller Deactivate - 002',
  description: 'Deactivate invalid plugin and check framework behavior',
  plugin: [constants.controllerPlugin],
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
          throw new Error('Proper error message is not shown while deactivating invalid plugin')
        }
      },
    },
  ],
}
