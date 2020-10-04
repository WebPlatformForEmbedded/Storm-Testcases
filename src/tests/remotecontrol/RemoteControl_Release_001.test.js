import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { pressKeyCodeToDevice, releaseKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Release - 001',
  description: 'Releases key on to the device and validates the result',
  context: {
    deviceName: 'Web',
    keyCode: '1',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Presses key on to device and validates the result',
      test() {
        return pressKeyCodeToDevice.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(
            `Press key code returned wrong result and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
    {
      description: 'Releases key on to invalid device and validates the result',
      test() {
        return releaseKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(
            `Release key code returned wrong result and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
