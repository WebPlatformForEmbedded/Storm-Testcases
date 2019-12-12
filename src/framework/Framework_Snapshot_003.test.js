import {
  getPluginState,
  pluginActivate,
  pluginDeactivate,
  screenshot,
} from '../commonMethods/commonFunctions'
import constants from '../commonMethods/constants'

export default {
  title: 'Framework snapshot Test 003',
  description: 'Tests if the Framework snapshot module works',
  steps: [
    {
      description: 'Deactivating WebKitBrowser Plugin',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivating Youtube Plugin',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivating Netflix Plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
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
      validate() {
        let resp = this.$data.read('screenshotResult')
        if (resp === undefined || resp.length === 0) {
          this.$log('Error while reading snapshot from Framework')
          return false
        } else {
          return true
        }
      },
    },
    {
      description: 'Check if Framework/snapshot still responds',
      test: getPluginState,
      params: constants.snapshotPlugin,
      assert: 'activated',
    },
  ],
}
