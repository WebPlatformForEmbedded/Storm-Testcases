import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getEdid } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Edid 001',
  description: 'Get TV Extended Display Identification Data  and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get TV Extended Display Identification Data validate the result',
      test() {
        return getEdid.call(this, 0)
      },
      validate(res) {
        if (res.length !== null && (res.data === '' || res.data !== null)) {
          return true
        } else {
          throw new Error('Error in getting Extension display ID')
        }
      },
    },
  ],
}
