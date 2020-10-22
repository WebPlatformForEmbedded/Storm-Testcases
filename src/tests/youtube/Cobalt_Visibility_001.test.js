import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setCobaltVisibility, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

export default {
  title: 'Cobalt Visibility - 001',
  description: 'Set Cobalt Visibility to Hidden and validate the result',
  context: {
    visibilityState: 'hidden',
  },
  plugin: [constants.youTubePlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
      () => suspendOrResumeCobaltPlugin.call(this, constants.resume),
    ])
  },
  steps: [
    {
      description: 'Set Cobalt Browser visibility',
      sleep: 10,
      test() {
        return setCobaltVisibility.call(this, this.$context.read('visibilityState'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(
            `Proper error message is not shown and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
