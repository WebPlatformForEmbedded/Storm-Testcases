import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import {
  getCobaltVisibility,
  setCobaltVisibility,
  suspendOrResumeCobaltPlugin,
} from '../../commonMethods/cobalt'

let listener
export default {
  title: 'Cobalt Visibility - 002',
  description: 'Set Cobalt Visibility to Visible and check the visibility state',
  context: {
    visibilityStateHidden: 'hidden',
    visibilityStateVisible: 'visible',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
      () => suspendOrResumeCobaltPlugin.call(this, constants.resume),
      () =>
        (listener = this.$thunder.api.Cobalt.on('visibilitychange', data => {
          this.$data.write('visibility', data.hidden)
        })),
    ])
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Set Cobalt Browser visibility',
      test() {
        return setCobaltVisibility.call(this, this.$context.read('visibilityStateHidden'))
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
      description: 'Set Cobalt Browser visibility to Visible',
      test() {
        return setCobaltVisibility.call(this, this.$context.read('visibilityStateVisible'))
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
            if (this.$data.read('visibility') === false) {
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
      description: 'Get Cobalt visibility and validate the result',
      test() {
        return getCobaltVisibility.call(this)
      },
      validate(res) {
        if (res === this.$context.read('visibilityStateVisible')) {
          return true
        } else {
          throw new Error(`Visibility is not as expected and is ${res}`)
        }
      },
    },
  ],
}
