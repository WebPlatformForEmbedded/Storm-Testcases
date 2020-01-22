import {
  pluginActivate,
  pluginDeactivate,
  restartFramework,
  screenshot,
  webKitBrowserOps,
} from './commonMethods/commonFunctions'
import constants from './commonMethods/constants'

export default {
  title: 'Framework snapshot test',
  description: 'Tests if the Framework snapshot module works',
  teardown: restartFramework,
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
      description: 'Deactivating and Activating WebKitBrowser plugin',
      test: webKitBrowserOps,
      assert: 'resumed',
    },
    {
      description: 'Get a screenshot',
      test: screenshot,
    },
  ],
  validate() {
    let resp = this.$data.read('screenshotResult')
    if (resp === undefined || resp.length === 0) {
      this.$log('Error while reading snapshot from Framework')
      return false
    } else {
      return true
    }
  },
}
