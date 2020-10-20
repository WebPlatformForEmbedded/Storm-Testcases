import { getControllerEnvironment } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Environment - 001',
  description: 'Get Framework Environment',
  plugin: [constants.controllerPlugin],
  steps: [
    {
      description: 'Get framework environment',
      test() {
        return getControllerEnvironment.call(this, 'SHELL')
      },
      validate(res) {
        if (res !== undefined && res !== null) {
          return true
        } else {
          throw new Error('Environment not available')
        }
      },
    },
  ],
}
