import {
  checkIfProcessIsRunning,
  stopWPEFramework,
  startFramework,
  pluginActivate,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'WebServer shutdown of Framework robustness test',
  description: 'Starts WebServer and stops Framework. Checks if everything is shutdown correctly',
  repeat: 30,
  steps: [
    {
      description: 'Activating Web Server Plugin',
      test: pluginActivate,
      params: constants.webServerPlugin,
      assert: 'activated',
    },
    {
      description: 'Stop Framework',
      test: stopWPEFramework,
      assert: true,
    },
    {
      description: 'Check if WebServerImplementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.webServerImplementation,
      assert: false,
    },
    {
      description: 'Start Framework',
      test: startFramework,
      assert: true,
    },
  ],
}
