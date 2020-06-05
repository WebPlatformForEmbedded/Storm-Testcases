import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setTime } from '../../commonMethods/timeSync'
import constants from '../../commonMethods/constants'

export default {
  title: 'TimeSync - GetTime 003',
  description: 'Check the error message when we set wrong time format',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.timeSyncPlugin),
      () => pluginActivate.call(this, constants.timeSyncPlugin),
    ])
  },
  steps: [
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
          throw new Error('Error message is improper')
        }
      },
    },
  ],
}
