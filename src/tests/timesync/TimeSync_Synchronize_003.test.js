import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCurrentTime, setTime, syncTime } from '../../commonMethods/timeSync'
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
        let datetime = Moment.utc().subtract(2, 'days')
        let pastDate = datetime.format('YYYY-MM-DDTHH:mm:ss') + 'Z'
        return setTime.call(this, pastDate)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Current Time is not provided')
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
        if (res == null) {
          return true
        } else {
          throw new Error('Sync does not start')
        }
      },
    },
    {
      description: 'Check whether time sync is success',
      sleep() {
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
      test() {
        return getCurrentTime.call(this)
      },
      validate(res) {
        let result = Moment.utc(res)
        let currTime = Moment.utc()
        let timeDiff = currTime.diff(result)
        if (timeDiff < 3000) {
          return true
        } else {
          throw new Error('Current Time is not provided')
        }
      },
    },
  ],
}
