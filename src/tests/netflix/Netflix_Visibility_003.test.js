import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setNetflixVisibility } from '../../commonMethods/netflix'

let listener
export default {
  title: 'Netflix Visibility - 003',
  description: 'Set Netflix Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.netFlixPlugin),
      () => pluginActivate.call(this, constants.netFlixPlugin),
      () =>
        (listener = this.$thunder.api.Netflix.on('visibilitychange', data => {
          this.$data.write('visibility', data.hidden)
        })),
    ])
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Set Netflix Browser visibility',
      test() {
        return setNetflixVisibility.call(this, this.$context.read('visibilityState'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Proper error message is not shown')
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
  ],
}
