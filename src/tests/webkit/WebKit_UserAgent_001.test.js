import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getUserAgent } from '../../commonMethods/webKitBrowser'

export default {
  title: 'Webkit User Agent - 001',
  description: 'Gets User agent details and validates the result',
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
      description: 'Gets User agent details and validates the result',
      test() {
        return getUserAgent.call(this)
      },
      validate(res) {
        if (res !== null && res !== undefined) {
          return true
        } else {
          throw new Error('Error in getting User agent details')
        }
      },
    },
  ],
}
