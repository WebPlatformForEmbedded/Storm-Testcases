import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitBrowserUrl } from '../../commonMethods/webKitBrowser'

export default {
  title: 'Webkit URL - 002',
  description: 'Loads invalid URL and check the webkit behavior',
  context: {
    url: '',
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
