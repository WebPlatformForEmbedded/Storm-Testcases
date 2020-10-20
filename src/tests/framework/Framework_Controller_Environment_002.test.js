import { getControllerEnvironment } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Environment - 002',
  description: 'Get Framework Environment with invalid environment and check framework behavior',
  plugin: [constants.controllerPlugin],
  steps: [
    {
      description: 'Get framework environment with invalid environment and check the error',
      test() {
        return getControllerEnvironment.call(this, 'invalidString')
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            'Proper error message is not shown while getting environment of invalid Environment'
          )
        }
      },
    },
  ],
}
