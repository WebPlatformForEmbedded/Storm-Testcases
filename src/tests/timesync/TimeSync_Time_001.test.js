import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCurrentTime } from '../../commonMethods/timeSync'
import constants from '../../commonMethods/constants'
import Moment from 'moment'

export default {
  title: 'TimeSync - GetTime 001',
  description: 'Check the latest Time returned from TimeSync Module',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.timeSyncPlugin),
      () => pluginActivate.call(this, constants.timeSyncPlugin),
    ])
  },
  steps: [
    {
      description: 'Invoke Time to get current time',
      sleep: 5,
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
