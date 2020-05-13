import constants from '../../commonMethods/constants'
import { getPluginState, pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { screenshot } from '../../commonMethods/commonFunctions'

export default {
  title: 'Framework snapshot Test 003',
  description: 'Tests if the Framework snapshot module works',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
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
