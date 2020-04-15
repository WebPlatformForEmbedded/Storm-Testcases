import {
  pluginDeactivate,
  pluginActivate,
  syncTime,
  setTime,
  getCurrentTime,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import Moment from 'moment'

let listener

export default {
  title: 'TimeSync - Synchronize 003',
  description:
    'Check whether date is correctly synchronized when Sync time is triggered with past date',
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
    listener.dispose()
  },
  steps: [
    {
      description: 'Set Time to Past time time',
      sleep: 5,
      test() {
        let datetime = Moment().subtract(2, 'days')
        return setTime.call(this, datetime)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Current Time is not provided')
          return false
        }
      },
    },
    {
      description: 'Invoke Time Synchronize',
      sleep: 5,
      test() {
        return syncTime.call(this)
      },
      validate(res) {
        this.$log('Result is', res)
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
    {
      description: 'Invoke Time to get current time',
      sleep: 5,
      test() {
        return getCurrentTime.call(this)
      },
      validate(res) {
        let result = Moment(res)
        let currTime = Moment()
        let timeDiff = currTime.diff(result)
        if (timeDiff < 3000) {
          return true
        } else {
          this.$log('Current Time is not provided')
          return false
        }
      },
    },
  ],
}
