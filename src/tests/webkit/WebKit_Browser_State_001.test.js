import {
  pluginDeactivate,
  pluginActivate,
  getWebKitState,
  setWebKitState,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Resume functionality test ',
  description: 'Resumes WPEWebkit plugin and check whether resumed or not',
  steps: [
    {
      description: 'Deactivate Webkit Browser',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Webkit Plugin',
      test: pluginActivate,
      params: constants.webKitBrowserPlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Webkit Plugin and check if it is resumed',
      test() {
        return setWebKitState.call(this, constants.resume)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          return false
        }
      },
    },
    {
      description: 'Get Webkit Plugin state and check if it is resumed',
      test() {
        return getWebKitState.call(this)
      },
      validate(res) {
        if (res == constants.resume) {
          return true
        } else {
          return false
        }
      },
    },
  ],
}
