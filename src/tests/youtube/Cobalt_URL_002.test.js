import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCobaltUrl, setCobaltUrl } from '../../commonMethods/cobalt'
import constants from '../../commonMethods/constants'

export default {
  title: 'Cobalt URL - 002',
  description: 'Loads valid URL and check the Cobalt behavior',
  context: {
    url: 'https://www.google.com/',
  },
  steps: [
    {
      description: 'Deactivate Cobalt browser',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Cobalt plugin',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'resumed',
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
          this.$log('Response is not as expected')
          return false
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
          this.$log('Response is ' + res + ' which is not as expected')
          return false
        }
      },
    },
  ],
}
