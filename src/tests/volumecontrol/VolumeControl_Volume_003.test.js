import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getVolume, setVolume } from '../../commonMethods/volumeControl'

let listener

export default {
  title: 'VolumeControl Volume - 003',
  description: 'Set the Volume to 0 and check whether volume set to 0',
  context: {
    volume: '0',
    initialVolume: '100',
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
      description: 'Set initial volume',
      test() {
        return setVolume.call(this, this.$context.read('initialVolume'))
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
      description: 'Set volume to 0',
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
