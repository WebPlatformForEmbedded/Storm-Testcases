import {
  pluginDeactivate,
  pluginActivate,
  setTime,
  getCurrentTime,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import Moment from 'moment'

export default {
  title: 'TimeSync - GetTime 002',
  description: 'Check the latest Time returned from TimeSync Module',
  steps: [
    {
      description: 'Check if TimeSync Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.timeSyncPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Time Sync Plugin is started correctly',
      test: pluginActivate,
      params: constants.timeSyncPlugin,
      assert: 'activated',
    },
    {
      description: 'Set Time to current time',
      sleep: 5,
      test() {
        let datetime = Moment()
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
