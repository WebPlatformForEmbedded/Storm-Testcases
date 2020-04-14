import {
  setCobaltUrl,
  pluginDeactivate,
  pluginActivate,
  getCobaltUrl,
} from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/commonFunctions'
import constants from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/constants'

export default {
  title: 'Cobalt URL - 001',
  description: 'Default URL on Cobalt',
  context: {
    url: 'https://www.youtube.com/tv',
  },
  steps: [
    {
      description: 'Deactivate Cobalt browser',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Cobalt browser',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'resumed',
    },
    {
      description: 'Get the default URL Loaded on Cobalt',
      sleep: 10,
      test() {
        return getCobaltUrl.call(this)
      },
      validate(res) {
        if (res === this.$context.read('url')) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
