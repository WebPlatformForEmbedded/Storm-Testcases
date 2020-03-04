import {
  pluginDeactivate,
  checkIfProcessIsRunning,
  stopWPEFramework,
  pluginActivate,
  startFramework,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix shutdown of Framework robustness test',
  description: 'Starts Netflix and stops Framework. Checks if everything is shutdown correctly',
  steps: [
    {
      description: 'Stop WebKit Browser Plugin',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Stop Youtube Plugin',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Stop Netflix Plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Start Netflix Plugin',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      description: 'Stop Framework',
      test: stopWPEFramework,
      assert: true,
    },
    {
      description: 'Check if NetflixImplementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.netflixImplementation,
      assert: false,
    },
    {
      description: 'Start Framework',
      test: startFramework,
      assert: true,
    },
  ],
}
