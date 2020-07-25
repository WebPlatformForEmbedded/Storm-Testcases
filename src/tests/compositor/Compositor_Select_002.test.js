import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { selectClient } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Select - 002',
  description: 'Execute Select Api with invalid client and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Select invalid Client and validate the result',
      sleep: 5,
      test() {
        return selectClient.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error('Invalid Error message')
        }
      },
    },
  ],
}
