import {
  setCobaltVisibility,
  getCobaltVisibility,
  pluginDeactivate,
  pluginActivate,
} from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/commonFunctions'
import constants from '../../../../../../../StormCLIForTest/Storm-CLI/testcases/Storm-Testcases/src/commonMethods/constants'

let listener
export default {
  title: 'Cobalr Visibility - 003',
  description: 'Set Cobalt Visibility to Hidden and check the visibility state',
  context: {
    visibilityState: 'hidden',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
      () =>
        (listener = this.$thunder.api.Cobalt.on('visibilitychange', data => {
          this.$data.write('visibility', data.hidden)
        })),
    ])
  },
  steps: [
    {
      description: 'Set Cobalt Browser visibility',
      test() {
        return setCobaltVisibility.call(this, this.$context.read('visibilityState'))
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
      description: 'Get Cobalt visibility and validate the result',
      test() {
        return getCobaltVisibility.call(this)
      },
      validate(res) {
        if (res === this.$context.read('visibilityState')) {
          return true
        } else {
          this.$log('Visibility is not as expected and is ', res)
          return false
        }
      },
    },
  ],
}
