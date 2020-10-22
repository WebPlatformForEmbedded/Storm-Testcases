import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getCurrentHDMIStatus } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Connected - 002',
  description: 'Get HDMI Connection Status and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get HDMI Connection status and validate the result',
      test() {
        return this.$prompt.selectChoices('Is HDMI display connected', ['Yes', 'No'], 20)
      },
      validate(res) {
        this.$data.write('Connected', res[0])
        return true
      },
    },
    {
      description: 'Get Current HDMI Connection status and validate the result',
      test() {
        return getCurrentHDMIStatus.call(this)
      },
      validate(res) {
        if (this.$data.read('Connected') === 'Yes') {
          if (res === true) {
            return true
          } else {
            throw new Error('Connections status is shown incorrect even HDMI is connected')
          }
        } else if (this.$data.read('Connected') === 'No') {
          if (res === false) {
            return true
          } else {
            throw new Error('Connection status is incorrect even HDMI is not connected')
          }
        } else {
          throw new Error('Error in getting connections status')
        }
      },
    },
  ],
}
