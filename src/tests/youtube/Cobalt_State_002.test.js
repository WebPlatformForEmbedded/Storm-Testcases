import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCobaltState, setCobaltState } from '../../commonMethods/cobalt'

let listener
export default {
  title: 'Cobalt Resume functionality test',
  description: 'Resume Cobalt plugin and check whether Resumed or not',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
      () =>
        (listener = this.$thunder.api.Cobalt.on('statechange', data => {
          this.$log('data is', data.suspended)
          this.$data.write('state', data.suspended)
        })),
    ])
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Suspend Cobalt Plugin and check if it is suspended',
      sleep: 10,
      test() {
        return setCobaltState.call(this, constants.suspend)
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
      description: 'Resume Cobalt Plugin and check if it is resumed',
      test() {
        return setCobaltState.call(this, constants.resume)
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
      description: 'Get Cobalt Plugin state and check if it is resumed',
      test() {
        return getCobaltState.call(this)
      },
      validate(res) {
        this.$log('res is', res)
        if (res == constants.resume) {
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
            if (this.$data.read('state') === false) {
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
