import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getUserAgent, setUserAgent } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit User Agent - 002',
  description: 'Set User agent and check whether the same is set',
  context: {
    useragent:
      'Mozilla/5.0 (Linux; x86_64 GNU/Linux) AppleWebKit/601.1 (KHTML, like Gecko) Version/8.0 Safari/601.1 WP',
  },
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
    ])
  },
  steps: [
    {
      description: 'Set User agent details and validates the result',
      test() {
        return setUserAgent.call(this, this.$context.read('useragent'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Error in setting User agent details')
        }
      },
    },
    {
      description: 'Gets User agent details and validates the result',
      test() {
        return getUserAgent.call(this)
      },
      validate(res) {
        if (res === this.$context.read('useragent')) {
          return true
        } else {
          throw new Error('Error in getting User agent details')
        }
      },
    },
  ],
}
