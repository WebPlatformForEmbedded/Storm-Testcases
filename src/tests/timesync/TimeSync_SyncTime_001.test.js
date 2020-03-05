import { getLatestSyncTime } from '../../commonMethods/commonFunctions'
import baseTest from './TimeSync_Synchronize_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Sync Time 001',
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
          //TODO - Need to update the validation with most recent Synced time
          if (res !== null && res.time !== null) {
            return true
          } else {
            this.$log('Latest Sync time is not available')
            return false
          }
        },
      },
    ],
  },
}
