import {
  pluginDeactivate,
  pluginActivate,
  getVolumeMuteStatus,
  setVolumeMuteStatus,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener
export default {
  title: 'VolumeControl Muted - 001',
  description: 'Set the Volume to Mute and check whether volume set to mute',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.volumeControl),
      () => pluginActivate.call(this, constants.volumeControl),
      () =>
        (listener = this.$thunder.api.VolumeControl.on('muted', data => {
          this.$data.write('muteState', data.muted)
        })),
    ])
  },
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
          this.$log('Error while setting Volume mute status')
          return false
        }
      },
    },
    {
      description: 'Sleep until Volume is muted',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'mute change' event from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('muteState') === true) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Volume not muted')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Get mute status and validate whether it is correct or not',
      sleep: 5,
      test() {
        return getVolumeMuteStatus.call(this)
      },
      validate(res) {
        if (res === true) {
          return true
        } else {
          this.$log('Mute state not set')
          return false
        }
      },
    },
  ],
}
