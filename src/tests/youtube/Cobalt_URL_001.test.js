import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCobaltUrl, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

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
