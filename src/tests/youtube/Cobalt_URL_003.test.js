import {
  pluginDeactivate,
  pluginActivate,
  setCobaltUrl,
} from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/commonFunctions'
import constants from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/constants'

export default {
  title: 'Cobalt URL - 003',
  description: 'Loads invalid URL and check the Cobalt behavior',
  context: {
    url: '',
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
      params: constants.webKitBrowserPlugin,
      assert: 'resumed',
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
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
