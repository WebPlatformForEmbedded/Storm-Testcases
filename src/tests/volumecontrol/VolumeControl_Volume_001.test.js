import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getVolume, setVolume } from '../../commonMethods/volumeControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'VolumeControl Volume - 001',
  description: 'Set the Volume to 100 and check whether volume set to 100',
  context: {
    volume: '100',
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
  ],
}
