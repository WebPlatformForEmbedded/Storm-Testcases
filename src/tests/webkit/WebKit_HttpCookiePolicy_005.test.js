import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setHttpCookieAcceptpolicy } from '../../commonMethods/webKitBrowser'

export default {
  title: 'Webkit HTTP Cookie Policy- 005',
  description: 'Set invalid Cookie policy and validate the result',
  context: {
    value: 'invalid',
  },
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
      description: 'Set HTTP Cookie Accept policy and validates the result',
      test() {
        return setHttpCookieAcceptpolicy.call(this, this.$context.read('value'))
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            `Proper error message is not shown while setting Cookie policy and and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
