import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setNetflixVisibility } from '../../commonMethods/netflix'

export default {
  title: 'Netflix Visibility - 001',
  description: 'Set Netflix Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  plugin: [constants.netFlixPlugin],
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
          throw new Error('Result is not as expected')
        }
      },
    },
  ],
}
