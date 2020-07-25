import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { loadDeviceKeyMap } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Load - 001',
  description: 'Reloads the device keymap and validates the result',
  context: {
    deviceName: 'DevInput',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Reloads Device key map and validates the result',
      sleep: 10,
      test() {
        return loadDeviceKeyMap.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Re-Loading the keymap doesnt work and the error is ${res.code}`)
        }
      },
    },
  ],
}
