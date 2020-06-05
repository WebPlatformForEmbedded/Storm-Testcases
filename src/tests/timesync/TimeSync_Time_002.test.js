import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCurrentTime, setTime } from '../../commonMethods/timeSync'
import constants from '../../commonMethods/constants'
import Moment from 'moment'

export default {
  title: 'TimeSync - GetTime 002',
  description: 'Check the latest Time returned from TimeSync Module',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.timeSyncPlugin),
      () => pluginActivate.call(this, constants.timeSyncPlugin),
    ])
  },
  steps: [
    {
      description: 'Set Time to current time',
      sleep: 5,
      test() {
        let datetime = Moment.utc()
        return setTime.call(this, datetime.format('YYYY-MM-DDTHH:mm:ss') + 'Z')
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
