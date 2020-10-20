import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getVolume, setVolume } from '../../commonMethods/volumeControl'

export default {
  title: 'VolumeControl Volume - 003',
  description: 'Set the Volume to 0 and check whether volume set to 0',
  context: {
    volume: '0',
    initialVolume: '100',
  },
  plugin: [constants.volumeControl],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.volumeControl),
      () => pluginActivate.call(this, constants.volumeControl),
    ])
  },
  steps: [
    {
      description: 'Set initial volume',
      sleep: 5,
      test() {
        return setVolume.call(this, this.$context.read('initialVolume'))
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
      description: 'Set volume to 0',
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
      description: 'Get volume status and validate whether the volume is correctly set or not',
      sleep: 5,
      test() {
        return getVolume.call(this)
      },
      validate(res) {
        if (res == this.$context.read('volume')) {
          return true
        } else {
          throw new Error('Volume not set to ' + this.$context.read('volume'))
        }
      },
    },
  ],
}
