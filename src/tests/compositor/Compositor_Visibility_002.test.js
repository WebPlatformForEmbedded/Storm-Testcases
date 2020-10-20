import constants from '../../commonMethods/constants'
import { setClientVisibility } from '../../commonMethods/compositor'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Compositor Client Visibility - 002',
  description: 'Sets the client visibility to invalid plugin and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  plugin: [constants.compositorPlugin],
  steps: [
    {
      description: 'Set Client Visibility to Visibile for invalid plugin and validate the result',
      test() {
        return setClientVisibility.call(this, constants.invalidPlugin, 'visible')
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Error message improper and is ${res.message}`)
        }
      },
    },
  ],
}
