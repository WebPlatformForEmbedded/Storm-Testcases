import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setNetflixState } from '../../commonMethods/netflix'

let listener
export default {
  title: 'Netflix Resume functionality test',
  description: 'Resume Netflix plugin and check whether Resumed or not',
  plugin: [constants.netFlixPlugin],
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
  teardown() {
    listener.dispose()
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
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
    {
      description: 'Resume Netflix Plugin and check if it is resumed',
      sleep: 5,
      test() {
        return setNetflixState.call(this, constants.resume)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Netflix is not resumed')
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
