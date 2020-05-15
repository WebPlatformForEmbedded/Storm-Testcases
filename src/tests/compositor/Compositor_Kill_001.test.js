import constants from '../../commonMethods/constants'
import {
  getControllerPluginData,
  pluginActivate,
  pluginDeactivate,
} from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { killClient } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Kill - 001',
  description: 'Kills the Plugin and validates the result',
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
      description: 'Kill WebKitBrowser Plugin',
      test() {
        return killClient.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Plugin not killed')
          return false
        }
      },
    },
    {
      description: 'Check if response is a JSON response',
      sleep: 5,
      test() {
        return getControllerPluginData.call(this)
      },
      validate(res) {
        this.$data.write('pluginInfo', res)
        return this.$expect(res).to.be.object() === true
      },
    },
    {
      description: 'Check for WebKitBrowser plugin in plugins list',
      test() {
        let pluginInfo = this.$data.read('pluginInfo')
        //TODO Best way to check WebKitBrowser is still live need to be implemented
        if (pluginInfo.indexOf('WebKitBrowser') !== -1) {
          this.$log('WebKitBrowser found in the list')
          return false
        } else {
          return true
        }
      },
      assert: true,
    },
  ],
}
