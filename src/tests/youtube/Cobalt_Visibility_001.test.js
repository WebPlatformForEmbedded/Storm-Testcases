import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import {
  getCobaltVisibility,
  setCobaltVisibility,
  suspendOrResumeCobaltPlugin,
} from '../../commonMethods/cobalt'

export default {
  title: 'Cobalt Visibility - 001',
  description: 'Set Cobalt Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  steps: [
    {
      description: 'Deactivate Cobalt Plugin',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Youtube Plugin and check suspended or not',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Cobalt Plugin and check resumed or not',
      test() {
        suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
    },
    {
      description: 'Set Cobalt Plugin visibility',
      test() {
        return setCobaltVisibility.call(this, this.$context.read('visibilityState'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Result is not as expected')
        }
      },
    },
    {
      description: 'Get Cobalt visibility and validate the result',
      test() {
        return getCobaltVisibility.call(this)
      },
      validate(res) {
        if (res === this.$context.read('visibilityState')) {
          return true
        } else {
          throw new Error('Visibility is not as expected and is ', res)
        }
      },
    },
  ],
}
