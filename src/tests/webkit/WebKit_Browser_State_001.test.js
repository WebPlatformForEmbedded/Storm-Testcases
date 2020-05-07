import {
  pluginDeactivate,
  pluginActivate,
  getWebKitState,
  setWebKitState,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener
export default {
  title: 'Webkit Resume functionality test  ',
  description: 'Resume WPEWebkit plugin and check whether Resumed or not',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
      () => pluginActivate.call(this, constants.webKitBrowserPlugin),
      () => {
        listener = this.$thunder.api.WebKitBrowser.on(
          'statechange',
          data => {
            this.$log('Got statechange event: ', data.suspended)
            this.$data.write('state', data.suspended)
          },
          e => {
            this.$log('Error subscribing to urlchange: ', e)
          }
        )
        return true
      },
    ])
  },
  steps: [
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
    {
      description: 'Wait until state change event for resume is detected',
      sleep: 10,
      test: () => {},
      validate() {
        return this.$data.read('state') === false
      },
    },
  ],
}
