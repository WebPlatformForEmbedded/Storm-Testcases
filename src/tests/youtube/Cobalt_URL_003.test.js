import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setCobaltUrl, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

export default {
  title: 'Cobalt URL - 003',
  description: 'Loads invalid URL and check the Cobalt behavior',
  context: {
    url: '',
  },
  plugin: [constants.youTubePlugin],
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
      description: 'Load invalid URL and check the response',
      test() {
        return setCobaltUrl.call(this, this.$context.read('url'))
      },
      validate(res) {
        if (res.code == 15 && res.message == 'ERROR_INCORRECT_URL') {
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
