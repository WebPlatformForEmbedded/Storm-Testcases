import baseTest from './Netflix_Visibility_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'visible',
    },
    plugin: [constants.netFlixPlugin],
    title: 'Netflix Visibility - 002',
    description: 'Set Netflix Visibility to Visible and check the visibility state',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
