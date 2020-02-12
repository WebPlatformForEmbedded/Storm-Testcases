import {
  checkIfProcessIsRunning,
  pluginActivate,
  startFramework,
  stopWPEFramework,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'OCDM shutdown of Framework robustness test',
  description: 'Starts OCDM and stops Framework. Checks if everything is shutdown correctly',
  repeat: 30,
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Activating ocdmPlugin',
      test: pluginActivate,
      params: constants.ocdmPlugin,
      assert: 'activated',
    },
    {
      description: 'Stop Framework',
      test: stopWPEFramework,
      params: constants.WPEFramework,
      assert: true,
    },
    {
      description: 'Check if OCDM Implementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.ocdmImplementation,
      assert: false,
    },
    {
      description: 'Start Framework',
      test: startFramework,
      assert: true,
    },
  ],
}
