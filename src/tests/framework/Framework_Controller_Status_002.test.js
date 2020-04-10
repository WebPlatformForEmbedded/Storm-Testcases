import { getPluginStatus } from '../../commonMethods/commonFunctions'

export default {
  title: 'Framework Controller Status - 002',
  description: 'Get status of multiple',
  steps: [
    {
      description: 'Get status of invalid plugin and check error message',
      test() {
        return getPluginStatus.call(this)
      },
      validate(res) {
        if (res !== undefined && res !== null) {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
