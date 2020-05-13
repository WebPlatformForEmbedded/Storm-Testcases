import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import { setNetflixVisibility } from '../../commonMethods/netflix'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix Visibility - 001',
  description: 'Set Netflix Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  steps: [
    {
      description: 'Deactivate Netflix Plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Netflix Plugin',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      description: 'Set Netflix Plugin visibility',
      test() {
        return setNetflixVisibility.call(this, this.$context.read('visibilityState'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          this.$log('Result is not as expected')
          return false
        }
      },
    },
  ],
}
