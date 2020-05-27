import constants from '../../commonMethods/constants'
import { killClient } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Kill - 002',
  description: 'Kills Invalid Plugin and validates the result',
  steps: [
    {
      description: 'Kill Invalid Plugin and validate the result',
      test() {
        return killClient.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code == 34 && res.message == 'ERROR_FIRST_RESOURCE_NOT_FOUND') {
          return true
        } else {
          throw new Error('Error message improper while killing the Invalid plugin')
        }
      },
    },
  ],
}
