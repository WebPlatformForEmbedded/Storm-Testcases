import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getPassthroughAudioStatus } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Audio Pass Through - 001',
  description: 'Get Status of Audio Passthrough and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get status of Audio Pass through and validate the result',
      test() {
        return getPassthroughAudioStatus.call(this)
      },
      validate(res) {
        if (res !== null) {
          return true
        } else {
          throw new Error('Error in getting Audio Passthrough')
        }
      },
    },
  ],
}
