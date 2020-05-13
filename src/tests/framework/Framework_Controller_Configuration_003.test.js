import constants from '../../commonMethods/constants'
import { getPluginConfiguration } from '../../commonMethods/controller'

export default {
  title: 'Framework Controller Configuration - 003',
  description: 'Get Configuration for Invalid Plugin ',
  steps: [
    {
      description: 'Get Configuration of Invalid Plugin and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
