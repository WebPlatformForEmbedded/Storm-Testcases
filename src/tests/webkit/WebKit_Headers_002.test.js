import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getHeaders, setHeaders, setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Headers - 002',
  description: 'Set Headers for WebKit and check whether the same is set or not',
  context: {
    name: 'X-Forwarded-For',
    value: '::1',
  },
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, constants.blankUrl),
    ])
  },
  steps: [
    {
      description: 'Set Headers and validate the result',
      test() {
        return setHeaders.call(this, this.$context.read('name'), this.$context.read('value'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Header data not set')
        }
      },
    },
    {
      description: 'Get Headers and validate the result',
      test() {
        return getHeaders.call(this)
      },
      validate(result) {
        let res = result[0]
        if (res.name === this.$context.read('name') && res.value === this.$context.read('value')) {
          return true
        } else {
          throw new Error('Error in getting error data')
        }
      },
    },
  ],
}
