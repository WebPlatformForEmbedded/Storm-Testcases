import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getVolumeMuteStatus, setVolumeMuteStatus } from '../../commonMethods/volumeControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'VolumeControl Muted - 001',
  description: 'Set the Volume to Mute and check whether volume set to mute',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.volumeControl),
      () => pluginActivate.call(this, constants.volumeControl),
    ])
  },
  plugin: [constants.volumeControl],
  steps: [
    {
      description: 'Set volume to Mute',
      sleep: 5,
      test() {
        return setVolumeMuteStatus.call(this, true)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Error while setting Volume mute status')
        }
      },
    },
    {
      description: 'Get mute status and validate whether it is correct or not',
      sleep: 10,
      test() {
        return getVolumeMuteStatus.call(this)
      },
      validate(res) {
        if (res === true) {
          return true
        } else {
          throw new Error('Mute state not set')
        }
      },
    },
  ],
}
