import {
  pluginDeactivate,
  pluginActivate,
  setTime,
  getCurrentTime,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

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
        let datetime = new Date()
        this.$log('Date time is', datetime)
        return setTime.call(this, datetime)
      },
      validate(res) {
        //TODO - Implement Proper validation to check whether the current time is returned
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
        //TODO - Implement Proper validation to check whether the current time is equal to the above step set time
        if (res == null) {
          return true
        } else {
          this.$log('Current Time is not provided')
          return false
        }
      },
    },
  ],
}
