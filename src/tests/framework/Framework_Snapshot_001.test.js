import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { webKitBrowserStartAndResume } from '../../commonMethods/webKitBrowser'
import { screenshot } from '../../commonMethods/commonFunctions'

export default {
  title: 'Framework snapshot test',
  description: 'Tests if the Framework snapshot module works',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
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
      description: 'Deactivating and Activating WebKitBrowser plugin',
      test: webKitBrowserStartAndResume,
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
