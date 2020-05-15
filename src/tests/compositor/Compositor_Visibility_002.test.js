import { setClientVisibility } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Visibility - 002',
  description: 'Sets the client visibility to invalid plugin and validates the result',
  steps: [
    {
      description: 'Set Client Visibility to Visibile for invalid plugin and validate the result',
      test() {
        return setClientVisibility.call(this, constants.invalidPlugin, 'visible')
      },
      validate(res) {
        if (res.code == 34 && res.message == 'ERROR_FIRST_RESOURCE_NOT_FOUND') {
          return true
        } else {
          this.$log('Error message improper')
          return false
        }
      },
    },
  ],
}
