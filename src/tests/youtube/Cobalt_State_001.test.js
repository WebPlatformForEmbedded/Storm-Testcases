import constants from '../../commonMethods/constants'
import { getCobaltState, setCobaltState } from '../../commonMethods/cobalt'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

let listener
export default {
  title: 'Cobalt Suspend functionality test',
  description: 'Suspend Cobalt plugin and check whether Suspended or not',
  plugin: [constants.youTubePlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
      () =>
        (listener = this.$thunder.api.Cobalt.on('statechange', data => {
          this.$data.write('state', data.suspended)
        })),
    ])
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Set Cobalt Plugin state to resumed',
      test() {
        return setCobaltState.call(this, constants.resume)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
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
          throw new Error(`Result is not as expected and is ${res}`)
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
    {
      description: 'Get Cobalt Plugin state and check if it is suspended',
      test() {
        return getCobaltState.call(this)
      },
      validate(res) {
        if (res == constants.suspend) {
          return true
        } else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
  ],
}
