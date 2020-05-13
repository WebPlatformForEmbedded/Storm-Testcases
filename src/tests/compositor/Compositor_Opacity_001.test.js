import { setClientOpacity } from '../../commonMethods/compositor'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Opacity - 001',
  description: 'Sets the client Opacity to 155 and validates the result',
  context: {
    opacityValue: 155,
  },
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
      description: 'Set Client Opacity and validate the result',
      sleep: 10,
      test() {
        return setClientOpacity.call(
          this,
          constants.netFlixPlugin,
          this.$context.read('opacityValue')
        )
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Opacity not set to ', this.$context.read('opacityValue'))
          return false
        }
      },
    },
  ],
}
