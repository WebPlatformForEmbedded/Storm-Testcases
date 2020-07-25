import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setCobaltVisibility, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

export default {
  title: 'Cobalt Visibility - 003',
  description: 'Set Cobalt Visibility to Visible and check the visibility state',
  context: {
    invalidVisibilityState: 'hidden',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
      () => suspendOrResumeCobaltPlugin.call(this, constants.resume),
    ])
  },
  steps: [
    {
      description: 'Set Cobalt Browser visibility to invalid state and validate the result',
      sleep: 10,
      test() {
        return setCobaltVisibility.call(this, this.$context.read('invalidVisibilityState'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
  ],
}
