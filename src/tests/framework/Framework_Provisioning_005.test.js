import { getProvisioningId } from '../../commonMethods/provisioning'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Provisioning - 005',
  description: 'Get Provisioning ID and validate the result',
  setup() {
    return this.$sequence([
      () => {
        pluginDeactivate.call(this, constants.provisioningPlugin)
      },
      () => {
        pluginActivate.call(this, constants.provisioningPlugin)
      },
    ])
  },
  steps: [
    {
      description: 'Get provisioning ID and validate the result',
      sleep: 5,
      test() {
        return getProvisioningId.call(this)
      },
      validate(res) {
        if (res !== null && res !== undefined) {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
  ],
}
