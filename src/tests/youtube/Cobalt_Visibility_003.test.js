import baseTest from './Cobalt_Visibility_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'invalid',
    },
    plugin: [constants.youTubePlugin],
    title: 'Cobalt Visibility - 003',
    description: 'Set Cobalt Visibility to invalid and validate the result',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
