import {
  pluginDeactivate,
  pluginActivate,
  setWebKitBrowserUrl,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit URL - 002',
  description: 'Loads invalid URL and check the webkit behavior',
  context: {
    url: '',
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
      description: 'Load invalid URL and check the response',
      test() {
        return setWebKitBrowserUrl.call(this, this.$context.read('url'))
      },
      validate(res) {
        if (res.code == 15 && res.message == 'ERROR_INCORRECT_URL') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
