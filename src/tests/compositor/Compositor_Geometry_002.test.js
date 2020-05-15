import { getClientGeometry } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Geometry - 002',
  description: 'Gets Geometry of invalid client and validates the result',
  steps: [
    {
      description: 'Get Compositor Geometry for invalid client and validate the result',
      test() {
        return getClientGeometry.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code === 34 && res.message === 'ERROR_FIRST_RESOURCE_NOT_FOUND') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
