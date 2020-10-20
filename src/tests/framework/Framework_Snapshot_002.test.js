import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { screenshot } from '../../commonMethods/commonFunctions'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

export default {
  title: 'Framework snapshot test with multiple start/stops',
  description: 'Tests if the Framework snapshot module works',
  repeat: 30,
  plugin: [
    constants.snapshotPlugin,
    constants.webKitBrowserPlugin,
    constants.uxplugin,
    constants.youTubePlugin,
  ],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, constants.blankUrl),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  steps: [
    {
      description: 'Deactivating Snapshot Plugin',
      test: pluginDeactivate,
      params: constants.snapshotPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activating Snapshot Plugin',
      test: pluginActivate,
      params: constants.snapshotPlugin,
      assert: 'activated',
    },
    {
      description: 'Get a screenshot',
      test: screenshot,
    },
  ],
  validate() {
    let resp = this.$data.read('screenshotResult')
    if (resp === undefined || resp.length === 0) {
      throw new Error('Error while reading snapshot from Framework')
    } else {
      return true
    }
  },
}
