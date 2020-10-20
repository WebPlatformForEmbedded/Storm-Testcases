import baseTest from './Compositor_Resolution_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      resolution: '720p50',
    },
    plugin: [constants.compositorPlugin],
    title: 'Compositor Resolution - 003',
    description:
      'Sets the resolution to 720p50 and checks whether the same resolution is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
