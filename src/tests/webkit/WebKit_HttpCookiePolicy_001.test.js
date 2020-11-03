import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import {
  getHttpCookieAcceptpolicy,
  setHttpCookieAcceptpolicy,
  setWebKitUrl,
} from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit HTTP Cookie Policy- 001',
  description: 'Set Cookie policy to always and check whether the same is set or not',
  context: {
    value: 'always',
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
      description: 'Set HTTP Cookie Accept policy and validates the result',
      test() {
        return setHttpCookieAcceptpolicy.call(this, this.$context.read('value'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Error in setting cookie policy')
        }
      },
    },
    {
      description: 'Get HTTP Cookie Accept policy and validates the result',
      test() {
        return getHttpCookieAcceptpolicy.call(this)
      },
      validate(res) {
        console.log('res is', res)
        if (res === this.$context.read('value')) {
          return true
        } else {
          throw new Error('Error in getting cookie policy')
        }
      },
    },
  ],
}
