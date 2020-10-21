import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { loadDeviceKeyMap } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Load - 002 ',
  description: 'Loads the device keymap for invalid device and validates the result',
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
      description: 'Loads Device key map on invalid device and validates the result',
      test() {
        return loadDeviceKeyMap.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(
            `Error message is improper while loading key map on invalid device and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
