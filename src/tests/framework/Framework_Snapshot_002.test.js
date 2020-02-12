import {
  pluginActivate,
  pluginDeactivate,
  screenshot,
  webKitBrowserStartAndResume,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework snapshot test with multiple start/stops',
  description: 'Tests if the Framework snapshot module works',
  repeat: 30,
  setup: webKitBrowserStartAndResume,
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
      this.$log('Error while reading snapshot from Framework')
      return false
    } else {
      return true
    }
  },
}
