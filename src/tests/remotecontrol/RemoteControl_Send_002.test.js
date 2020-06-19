import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { sendKeyCodeToDevice} from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Send - 002',
  description: 'Sends Key to the invalid device and validate the result',
  context: {
    deviceName: 'invalidevice',
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
      description: 'Sends Keycode to device and validate the result',
      test() {
        return sendKeyCodeToDevice.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('code')
        )
      },
      validate(res) {
        if (res.code == '2' && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error('Invalid error message shown')
        }
      },
    },
  ],
}
