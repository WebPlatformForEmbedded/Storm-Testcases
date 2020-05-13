import { setClientVisibility } from '../../commonMethods/compositor'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Visibility - 001',
  description: 'Sets the client visibility and validates the result',
  steps: [
    {
      description: 'Deactivate Netflix Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Netflix Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      description: 'Set Client Visibility to hidden and validate the result',
      sleep: 10,
      test() {
        return setClientVisibility.call(this, constants.netFlixPlugin, 'hidden')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Visbility not set to hidden')
          return false
        }
      },
    },
    {
      description: 'Set Client Visibility to Visibile and validate the result',
      test() {
        return setClientVisibility.call(this, constants.netFlixPlugin, 'visible')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Visbility not set to visible')
          return false
        }
      },
    },
  ],
}
