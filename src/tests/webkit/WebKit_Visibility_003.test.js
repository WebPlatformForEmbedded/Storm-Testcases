import {
  setWebKitBrowserVisibility,
  getWebKitBrowserVisibility,
  pluginDeactivate,
  pluginActivate,
} from '../../commonMethods/commonFunctions'

let listener
export default {
  title: 'Webkit Visibility - 003',
  description: 'Set Webkit Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
      () => {
        listener = this.$thunder.api.WebKitBrowser.on(
          'visibilitychange',
          data => {
            this.$log('Got visibilitychange event: ', data.hidden)
            this.$data.write('visibility', data.hidden)
          },
          e => {
            this.$log('Error subscribing to visibilitychange: ', e)
          }
        )
        return true
      },
    ])
  },
  steps: [
    {
      description: 'Set Webkit Browser visibility',
      test() {
        return setWebKitBrowserVisibility.call(this, this.$context.read('visibilityState'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
    {
      description: 'Wait until visiblity change event is changed',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'visibility change' response from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('visibility') === true) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Visibility not changed')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Get Webkit Browser visibility and validate the result',
      test() {
        return getWebKitBrowserVisibility.call(this)
      },
      validate(res) {
        if (res === this.$context.read('visibilityState')) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
