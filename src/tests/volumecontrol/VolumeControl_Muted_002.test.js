import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getVolumeMuteStatus, setVolumeMuteStatus } from '../../commonMethods/volumeControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'VolumeControl Muted - 002',
  description: 'Set the Volume to Un-Mute and check whether volume is unmuted',
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
      description: 'Set volume to UnMute',
      sleep: 5,
      test() {
        return setVolumeMuteStatus.call(this, false)
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
        if (res === false) {
          return true
        } else {
          throw new Error('Volume state not set')
        }
      },
    },
  ],
}
