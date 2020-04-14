import {
  pluginDeactivate,
  pluginActivate,
  setWebKitBrowserVisibility,
  getWebKitBrowserVisibility,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Visibility - 001',
  description: 'Set Webkit Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  steps: [
    {
      description: 'Deactivate WebKit browser',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate WebKit browser',
      test: pluginActivate,
      params: constants.webKitBrowserPlugin,
      assert: 'suspended',
    },
    {
      description: 'Set Webkit Browser visibility',
      test() {
        return setWebKitBrowserVisibility.call(this, this.$context.read('visibilityState'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
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
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
