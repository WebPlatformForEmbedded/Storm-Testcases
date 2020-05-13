import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { syncTime } from '../../commonMethods/timeSync'
import constants from '../../commonMethods/constants'

let listener

export default {
  title: 'TimeSync - Synchronize 001',
  description: 'Check the Synchronize Functionality of TimeSync Module',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.timeSyncPlugin),
      () => pluginActivate.call(this, constants.timeSyncPlugin),
      () => {
        this.$data.write('timechanged', false)
        listener = this.$thunder.api.TimeSync.on('timechange', () => {
          this.$data.write('timechanged', true)
        })
      },
    ])
  },
  teardown() {
    listener.dispose
  },
  steps: [
    {
      description: 'Invoke Time Synchronize',
      sleep: 5,
      test() {
        return syncTime.call(this)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Sync does not start')
          return false
        }
      },
    },
    {
      description: 'Check whether time sync is success',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('timechanged') === true) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 20) {
              clearInterval(interval)
              reject('Time Sync not completed')
            }
          }, 1000)
        })
      },
    },
  ],
}
