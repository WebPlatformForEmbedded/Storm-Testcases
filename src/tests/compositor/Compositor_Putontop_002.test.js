import constants from '../../commonMethods/constants'
import { putOnTop } from '../../commonMethods/compositor'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Compositor Putontop Functionality - 002',
  description: 'Checks the puton top functionality for invalid plugin',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Put Invalid plugin on top',
      test() {
        return putOnTop.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code == 2 && res.message == 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error('Error message improper while putting invalid plugin ontop')
        }
      },
    },
  ],
}
