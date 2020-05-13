import { getLatestSyncTime } from '../../commonMethods/timeSync'
import baseTest from './TimeSync_Synchronize_001.test'
import Moment from 'moment'

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
  },
}
