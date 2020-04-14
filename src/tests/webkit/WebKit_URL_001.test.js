import {
  setWebKitBrowserUrl,
  getWebKitBrowserUrl,
  pluginDeactivate,
  pluginActivate,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit URL - 001',
  description: 'Loads valid URL and check the webkit behavior',
  context: {
    url: 'http://cdn.metrological.com/static/testbot/v1/images_app.html',
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
      description: 'Load URL and check the response',
      test() {
        return setWebKitBrowserUrl.call(this, this.$context.read('url'))
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
      description: 'Get the Loaded URL',
      test() {
        return getWebKitBrowserUrl.call(this)
      },
      validate(res) {
        if (res === this.$context.read('url')) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
