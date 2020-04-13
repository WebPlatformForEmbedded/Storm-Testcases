import {
  setWebKitBrowserVisibility,
  getWebKitBrowserVisibility,
} from '../../commonMethods/commonFunctions'

let listener
export default {
  title: 'Webkit Visibility - 003',
  description: 'Set Webkit Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  setup() {
    listener = this.$thunder.api.WebKitBrowser.on('visibilitychange', data => {
      this.$data.write('visibility', data.hidden)
    })
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
