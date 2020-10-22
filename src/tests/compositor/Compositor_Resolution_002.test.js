import baseTest from './Compositor_Resolution_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      resolution: '480p',
    },
    plugin: [constants.compositorPlugin],
    title: 'Compositor Resolution - 002',
    description: 'Sets the resolution to 480p and checks whether the same resolution is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
