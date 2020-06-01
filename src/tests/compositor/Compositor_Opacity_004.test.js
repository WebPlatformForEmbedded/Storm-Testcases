import { setClientOpacity } from '../../commonMethods/compositor'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Opacity - 004',
  description: 'Sets the client Opacity for invalid Client',
  context: {
    opacityValue: '255',
  },
  steps: [
    {
      description: 'Set Client Opacity to 255 and validate the result',
      test() {
        return setClientOpacity.call(
          this,
          constants.invalidPlugin,
          this.$context.read('opacityValue')
        )
      },
      validate(res) {
        if (res.code == 34 && res.message == 'ERROR_FIRST_RESOURCE_NOT_FOUND') {
          return true
        } else {
          throw new Error('Error message improper while setting the opacity for invalid cli1ent')
        }
      },
    },
  ],
}
