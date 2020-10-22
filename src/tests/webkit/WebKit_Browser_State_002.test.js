import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getWebKitState, setWebKitState } from '../../commonMethods/webKitBrowser'

let listener
export default {
  title: 'Webkit Suspend functionality test  ',
  description: 'Suspends WPEWebkit plugin and check whether suspended or not',
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('statechange', data => {
          this.$data.write('state', data.suspended)
        })),
    ])
  },
  teardown() {
    listener.dispose()
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
          throw new Error(`Result is not as expected while resuming webkit and is ${res}`)
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
          throw new Error(`Result is not as expected while suspending webkit and is ${res}`)
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
    {
      description: 'Get Webkit Plugin state and check if it is suspended',
      test() {
        return getWebKitState.call(this)
      },
      validate(res) {
        if (res == constants.suspend) {
          return true
        } else {
          throw new Error(`Result is not as expected while getting webkit state and is ${res}`)
        }
      },
    },
  ],
}
