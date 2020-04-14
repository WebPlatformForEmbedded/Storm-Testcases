import baseTest from './Netflix_Visibility_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'visible',
    },
    title: 'Netflix Visibility - 002',
    description: 'Set Netflix Visibility to Visible and check the visibility state',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
