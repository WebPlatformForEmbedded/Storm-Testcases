import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { saveDeviceKeyMap } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Save - 002',
  description: 'Saves the device keymap on invalid device and validates the result',
  context: {
    deviceName: 'invalidDevice',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Save Device key map on invalide device and validates the result',
      test() {
        return saveDeviceKeyMap.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Error message is improper and is ${res.code}`)
        }
      },
    },
  ],
}
