import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import {
  getWebKitBrowserVisibility,
  setWebKitBrowserVisibility,
} from '../../commonMethods/webKitBrowser'

export default {
  title: 'Webkit Visibility - 001',
  description: 'Set Webkit Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  steps: [
    {
      description: 'Set Webkit Browser visibility',
      test() {
        return setWebKitBrowserVisibility.call(this, this.$context.read('visibilityState'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
    {
      description: 'Get Webkit Browser visibility and validate the result',
      test() {
        return getWebKitBrowserVisibility.call(this)
      },
      validate(res) {
        if (res === this.$context.read('visibilityState')) {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
  ],
}
