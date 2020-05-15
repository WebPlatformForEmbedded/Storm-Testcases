import constants from '../../commonMethods/constants'
import { putOnTop } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Putontop Functionality - 002',
  description: 'Checks the puton top functionality for invalid plugin',
  steps: [
    {
      description: 'Put Invalid plugin on top',
      test() {
        return putOnTop.call(this, constants.invalidPlugin)
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
