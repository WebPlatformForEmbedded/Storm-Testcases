import {
  pluginDeactivate,
  checkIfProcessIsRunning,
  webKitBrowserStartAndResume,
  stopWPEFramework,
  startFramework,
  getControllerPluginData,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'WPEWebkit shutdown of Framework robustness test',
  description: 'Starts WPEWebkit and stops Framework. Checks if everything is shutdown correctly',
  repeat: 30,
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginDeactivate.call(this, constants.netFlixPlugin),
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
  ],
}
