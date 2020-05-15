import {
  pluginDeactivate,
  pluginActivate,
  setClientVisibility,
  setWebKitUrl,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Visibility - 001',
  description: 'Sets the client visibility and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, 'about:blank'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  steps: [
    {
      description: 'Set Client Visibility to hidden and validate the result',
      sleep: 10,
      test() {
        return setClientVisibility.call(this, constants.webKitBrowserPlugin, 'hidden')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Visbility not set to hidden')
          return false
        }
      },
    },
    {
      description: 'Set Client Visibility to Visibile and validate the result',
      test() {
        return setClientVisibility.call(this, constants.webKitBrowserPlugin, 'visible')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Visbility not set to visible')
          return false
        }
      },
    },
  ],
}
