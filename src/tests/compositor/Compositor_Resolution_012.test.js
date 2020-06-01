import { setCompositorResolution } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Resolution - 012',
  description: 'Sets the resolution to invalid and validate the result',
  context: {
    resolution: 'invalidres',
  },
  steps: [
    {
      description: 'Set Compositor resolution to invalid and validate the result',
      test() {
        return setCompositorResolution.call(this, this.$context.read('resolution'))
      },
      validate(res) {
        if (res.code == 22 && res.message == 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error('Error is is not as expected and is ' + res.message)
        }
      },
    },
  ],
}
