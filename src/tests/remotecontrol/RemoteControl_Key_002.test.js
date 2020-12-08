import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getKeyCodeDetails } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Key - 002',
  description: 'Get Key code details for Invalid device and validate the result',
  context: {
    deviceName: 'invalidevice',
    code: '1',
  },
  plugin: [constants.remoteControlPlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Get Keycode details for invalid device and validate the result',
      test() {
        return getKeyCodeDetails.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('code')
        )
      },
      validate(res) {
        if (res.code == '2' && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(
            `Invalid error message shown while getting keycode details in invalid device and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
