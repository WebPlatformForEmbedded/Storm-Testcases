import baseTest from './Cobalt_Visibility_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'visible',
    },
    plugin: [constants.youTubePlugin],
    title: 'Cobalt Visibility - 002',
    description: 'Set Cobalt Visibility to visible and validate the result',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
