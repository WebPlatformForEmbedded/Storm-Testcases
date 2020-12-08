import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { modifyRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Modify - 003',
  description: 'Modifies invalid key and validates the result',
  context: {
    deviceName: 'DevInput',
    keyCode: '10000000000000000000000',
    key: 103,
    modifier: ['leftshift'],
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
      description: 'Modify invalid keycode and validate  the result',
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
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            `Error message is improper while modifying invalid keycode details and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
