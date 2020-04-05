import { getControllerEnvironment } from '../../commonMethods/commonFunctions'

export default {
  title: 'Framework Controller Environment - 001',
  description: 'Get Framework Environment',
  steps: [
    {
      description: 'Get framework environment',
      test() {
        return getControllerEnvironment.call(this, 'SHELL')
      },
      validate(res) {
        this.$log('Res is', res)
        if (res !== undefined && res !== null) {
          return true
        } else {
          this.$log('Environment not available')
          return false
        }
      },
    },
  ],
}
