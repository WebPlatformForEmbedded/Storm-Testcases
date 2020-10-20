import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCobaltUrl, setCobaltUrl, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

export default {
  title: 'Cobalt URL - 002',
  description: 'Loads valid URL and check the Cobalt behavior',
  context: {
    url: 'https://www.google.com/',
  },
  plugin: [constants.youTubePlugin],
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
      description: 'Load URL and check the response',
      sleep: 10,
      test() {
        return setCobaltUrl.call(this, this.$context.read('url'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Response is not as expected')
        }
      },
    },
    {
      description: 'Get the Loaded URL',
      test() {
        return getCobaltUrl.call(this)
      },
      validate(res) {
        if (res === this.$context.read('url')) {
          return true
        } else {
          throw new Error('Response is ' + res + ' which is not as expected')
        }
      },
    },
  ],
}
