import {
  pluginDeactivate,
  pluginActivate,
  getVolume,
  setVolume,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener

export default {
  title: 'VolumeControl Volume - 001',
  description: 'Set the Volume to 100 and check whether volume set to 100',
  context: {
    volume: '100',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.volumeControl),
      () => pluginActivate.call(this, constants.volumeControl),
      () =>
        (listener = this.$thunder.api.VolumeControl.on('volume', data => {
          this.$data.write('volume', data.volume)
        })),
    ])
  },
  steps: [
    {
      description: 'Set volume',
      test() {
        return setVolume.call(this, this.$context.read('volume'))
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Error while setting Volume')
          return false
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
            if (this.$data.read('volume') === this.$context.read('volume')) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Volume not set to' + this.$context.read('volume'))
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Get volume status and validate whether the volume is correctly set or not',
      test() {
        return getVolume.call(this)
      },
      validate(res) {
        if (res === this.$context.read('volume')) {
          return true
        } else {
          this.$log('Volume not set to ' + this.$context.read('volume'))
          return false
        }
      },
    },
  ],
}
