import { pluginDeactivate, pluginActivate, setTime } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'TimeSync - GetTime 003',
  description: 'Check the error message when we set wrong time format',
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
      description: 'Set Time to Invalid time and validate the error',
      sleep: 5,
      test() {
        return setTime.call(this, 'datetime')
      },
      validate(res) {
        if (res.code == 30 && res.message == 'ERROR_BAD_REQUEST') {
          return true
        } else {
          this.$log('Error message is improper')
          return false
        }
      },
    },
  ],
}
