import {
  pluginDeactivate,
  pluginActivate,
  getNetflixState,
  setNetflixState,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener
export default {
  title: 'Netflix Suspend functionality test',
  description: 'Suspend Netflix plugin and check whether Suspended or not',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.netFlixPlugin),
      () => pluginActivate.call(this, constants.netFlixPlugin),
      () =>
        (listener = this.$thunder.api.Netflix.on('statechange', data => {
          this.$data.write('state', data.suspended)
        })),
    ])
  },
  steps: [
    {
      description: 'Suspend Netflix Plugin and check if it is suspended',
      sleep: 10,
      test() {
        return setNetflixState.call(this, constants.suspend)
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
      description: 'Get Netflix Plugin state and check if it is suspended',
      test() {
        return getNetflixState.call(this)
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
      description: 'Wait until state change event for suspend is detected',
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
