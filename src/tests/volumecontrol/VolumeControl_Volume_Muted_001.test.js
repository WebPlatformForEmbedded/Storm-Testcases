import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import {
  getVolume,
  getVolumeMuteStatus,
  setVolume,
  setVolumeMuteStatus,
} from '../../commonMethods/volumeControl'
import constants from '../../commonMethods/constants'

let muteListener
let volumeListener

export default {
  title: 'VolumeControl Volume Muted - 001',
  description: 'Set the Volume to 100 and Mute the volume',
  context: {
    volume: '100',
  },
  plugin: [constants.volumeControl],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.volumeControl),
      () => pluginActivate.call(this, constants.volumeControl),
      () =>
        (muteListener = this.$thunder.api.VolumeControl.on('muted', data => {
          this.$data.write('muteState', data.muted)
        })),
      () =>
        (volumeListener = this.$thunder.api.VolumeControl.on('volume', data => {
          this.$data.write('volume', data.volume)
        })),
    ])
  },
  teardown() {
    muteListener.dispose()
    volumeListener.dispose()
  },
  steps: [
    {
      description: 'Set volume',
      sleep: 5,
      test() {
        return setVolume.call(this, this.$context.read('volume'))
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Error while setting Volume')
        }
      },
    },
    {
      description: 'Sleep until Volume is set',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'volume change' event from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('volume') == this.$context.read('volume')) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject(`Volume not set to ${this.$context.read('volume')}`)
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Get volume status and validate whether the volume is correctly set or not',
      sleep: 5,
      test() {
        return getVolume.call(this)
      },
      validate(res) {
        if (res == this.$context.read('volume')) {
          return true
        } else {
          throw new Error(`Volume not set to ${this.$context.read('volume')}`)
        }
      },
    },
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
          throw new Error('Mute state not set')
        }
      },
    },
  ],
}
