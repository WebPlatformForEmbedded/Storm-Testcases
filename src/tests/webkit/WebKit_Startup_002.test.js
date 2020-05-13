import { pluginDeactivate } from '../../commonMethods/controller'
import { webKitBrowserStartAndResume } from '../../commonMethods/webKitBrowser'
import {
  checkIfProcessIsRunning,
  startFramework,
  stopWPEFramework,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'WPEWebkit shutdown of Framework robustness test',
  description: 'Starts WPEWebkit and stops Framework. Checks if everything is shutdown correctly',
  repeat: 30,
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
      description: 'Activate WebKit Plugin and check whether it is resumed correctly',
      test: webKitBrowserStartAndResume,
      assert: 'resumed',
    },
    {
      description: 'Stop Framework',
      test: stopWPEFramework,
      assert: true,
    },
    {
      description: 'Check if WebKitImplementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.webKitImplementation,
      assert: false,
    },
    {
      description: 'Start Framework',
      test: startFramework,
      assert: true,
    },
  ],
}
