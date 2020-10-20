import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import {
  addRemoteControlKey,
  deleteRemoteControlKey,
  getKeyCodeDetails,
} from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Delete - 001',
  description: 'Deletes key from the table and validates the result',
  context: {
    deviceName: 'DevInput',
    keyCode: '1',
    key: 103,
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
      description: 'Delete remote control validates the result',
      test() {
        return deleteRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Deleting key doesnt work and the error is ${res.code}`)
        }
      },
    },
    {
      description: 'Get deleted Keycode details and validate the result',
      sleep: 5,
      test() {
        return getKeyCodeDetails.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error('Invalid error message shown')
        }
      },
    },
    {
      description: 'Add remote control validates the result',
      test() {
        return addRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode'),
          this.$context.read('key')
        )
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Deleting key doesnt work and the error is ${res.code}`)
        }
      },
    },
    {
      description: 'Get added Keycode details and validate the result',
      sleep: 5,
      test() {
        return getKeyCodeDetails.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res.code == '1' && res.key === 103) {
          return true
        } else {
          throw new Error('Invalid error message shown')
        }
      },
    },
  ],
}
