import constants from '../../commonMethods/constants'
import { pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Framework Controller Deactivate - 003',
  description: 'Deactivates Controller plugin and check framework behavior',
  steps: [
    {
      description: 'Deactivating Controller plugin and check error message',
      test() {
        return pluginDeactivate.call(this, constants.controllerPlugin)
      },
      validate(res) {
        if (res.code === 24 && res.message === 'ERROR_PRIVILIGED_REQUEST') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
