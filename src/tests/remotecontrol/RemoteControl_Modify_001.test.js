import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getKeyCodeDetails, modifyRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Modify - 001',
  description: 'Modifies existing key from the table and validates the result',
  context: {
    deviceName: 'DevInput',
    keyCode: '1',
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
      description: 'Modify remote control validates the result',
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
        if (res === null) {
          return true
        } else {
          throw new Error(
            `Modifying existing key doesnt work and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
    {
      description: 'Get modified Keycode details and validate the result',
      sleep: 5,
      test() {
        return getKeyCodeDetails.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res.code == '1' && res.key === 103 && res.modifiers[0] == 'leftshift') {
          return true
        } else {
          throw new Error('Invalid error message shown while getting modified key code details')
        }
      },
    },
  ],
}
