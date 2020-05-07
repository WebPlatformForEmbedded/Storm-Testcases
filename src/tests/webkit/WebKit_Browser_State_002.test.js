import {
  pluginDeactivate,
  pluginActivate,
  getWebKitState,
  setWebKitState,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener
export default {
  title: 'Webkit Suspend functionality test  ',
  description: 'Suspends WPEWebkit plugin and check whether suspended or not',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
      () => pluginActivate.call(this, constants.webKitBrowserPlugin),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('statechange', data => {
          this.$data.write('state', data.suspended)
        })),
    ])
  },
  teardown() {
    return this.$sequence([
      () => setWebKitState.call(this, constants.resume),
      () => {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 5000)
        })
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
      description: 'Suspend Webkit Plugin and validate the result',
      test() {
        return setWebKitState.call(this, constants.suspend)
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
      description: 'Get Webkit Plugin state and check if it is suspended',
      test() {
        return getWebKitState.call(this)
      },
      validate(res) {
        if (res == constants.suspend) {
          return true
        } else {
          return false
        }
      },
    },
    {
      description: 'Wait until state change event is detected',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'state change' response from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('state') === true) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('State not changed')
            }
          }, 1000)
        })
      },
    },
  ],
}
