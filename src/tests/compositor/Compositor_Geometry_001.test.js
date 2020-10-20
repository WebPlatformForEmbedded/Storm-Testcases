import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { getClientGeometry, setClientGeometry } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Geometry - 001',
  description: 'Sets and gets the Geometry of client',
  plugin: [constants.compositorPlugin, constants.webKitBrowserPlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
      () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
      () => pluginDeactivate.call(this, constants.uxplugin),
      () => pluginActivate.call(this, constants.webKitBrowserPlugin),
      () => setWebKitUrl.call(this, constants.blankUrl),
      () => {
        return this.$thunder.api.call(constants.webKitBrowserPlugin, 'state', constants.resume)
      },
    ])
  },
  teardown() {
    pluginDeactivate.call(this, constants.youTubePlugin)
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
          throw new Error('Client geometry not set')
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
          throw new Error('Client Geometry not set correctly')
        }
      },
    },
  ],
}
