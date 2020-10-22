import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { modifyRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Modify - 002',
  description: 'Modifies existing key from the invalid device and validates the result',
  context: {
    deviceName: 'InvalidDevice',
    keyCode: '1',
    key: 103,
    modifier: ['leftshift'],
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
      description: 'Modify remote control for invalid device validates the result',
      test() {
        return modifyRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode'),
          this.$context.read('key'),
          this.$context.read('modifier')
        )
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(
            `Error message is improper while modifying keys for invalid deviceand Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
