import {
  pluginDeactivate,
  pluginActivate,
  getClientGeometry,
  setClientGeometry,
  setWebKitUrl,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Geometry - 001',
  description: 'Sets and gets the Geometry of client',
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
      description: 'Set Compositor Geometry and validate the result',
      sleep: 5,
      test() {
        return setClientGeometry.call(this, constants.webKitBrowserPlugin, '1', '1', '480', '360')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Client geometry not set')
          return false
        }
      },
    },
    {
      description: 'Get Client Geometry and validate the result',
      test() {
        return getClientGeometry.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res.x == '1' && res.y == '1' && res.width == '480' && res.height == '360') {
          return true
        } else {
          this.$log('Client Geometry not set correctly')
          return false
        }
      },
    },
  ],
}
