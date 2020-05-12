import { putBelow } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Putbelow Functionality - 002',
  description: 'Checks the putbelow functionality for invalid plugin',
  steps: [
    {
      description: 'Put Invalid plugin below UX plugin',
      test() {
        return putBelow.call(this, constants.invalidPlugin, constants.uxplugin)
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