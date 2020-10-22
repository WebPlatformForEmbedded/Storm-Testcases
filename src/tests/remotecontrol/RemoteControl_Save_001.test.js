import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { saveDeviceKeyMap } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Save - 001',
  description: 'Saves the device keymap and validates the result',
  context: {
    deviceName: 'DevInput',
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
      description: 'Save Device key map and validates the result',
      test() {
        return saveDeviceKeyMap.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(
            `Saving key map doesnt work and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
