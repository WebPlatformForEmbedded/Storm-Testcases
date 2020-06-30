import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getKeyCodeDetails } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Key - 001',
  description: 'Get Key code details and validate the result',
  context: {
    deviceName: 'Web',
    code: '1',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Get Keycode details and validate the result',
      test() {
        return getKeyCodeDetails.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('code')
        )
      },
      validate(res) {
        if (res.code == '1' && res.key === 103) {
          return true
        } else {
          throw new Error('Error getting keycode details')
        }
      },
    },
  ],
}
