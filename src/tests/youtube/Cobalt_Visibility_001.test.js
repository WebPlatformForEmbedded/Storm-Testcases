import {
  pluginDeactivate,
  pluginActivate,
  setCobaltVisibility,
  getCobaltVisibility,
} from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/commonFunctions'
import constants from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/constants'

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
      description: 'Activate Cobalt Plugin',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'resumed',
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
          this.$log('Result is not as expected')
          return false
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
          this.$log('Visibility is not as expected and is ', res)
          return false
        }
      },
    },
  ],
}
