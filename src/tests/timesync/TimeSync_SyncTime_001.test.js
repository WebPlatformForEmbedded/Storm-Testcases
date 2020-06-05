import baseTest from './TimeSync_Synchronize_001.test'
import Moment from 'moment'
import { getLatestSyncTime } from '../../commonMethods/timeSync'

export default {
  ...baseTest,
  ...{
    title: 'TimeSync - SyncTime 001',
    description: 'Check the latest Synchronized time',
    steps: [
      baseTest,
      {
        description: 'Get latest Synchronized time',
        sleep: 5,
        test() {
          return getLatestSyncTime.call(this)
        },
        validate(res) {
          let result = Moment.utc(res.time)
          let currTime = Moment.utc()
          let timeDiff = currTime.diff(result)
          if (timeDiff < 15000) {
            return true
          } else {
            throw new Error('Current Time is not provided')
          }
        },
      },
    ],
  },
}
