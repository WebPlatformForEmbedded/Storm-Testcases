import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { pressKeyCodeToDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Press - 003',
  description: 'Presses invalid Key to the device and validate the result',
  context: {
    deviceName: 'Web',
    code: '10000000000000000000000',
  },
  plugin: [constants.locationSyncPlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Presses invalid Keycode to device and validate the result',
      test() {
        return pressKeyCodeToDevice.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('code')
        )
      },
      validate(res) {
        if (res.code == '22' && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            `Invalid error message shown while pressing invalid key code and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
