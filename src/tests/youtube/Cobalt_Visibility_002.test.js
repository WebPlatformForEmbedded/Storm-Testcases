import baseTest from './Cobalt_Visibility_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'visible',
    },
    title: 'Cobalt Visibility - 002',
    description: 'Set Cobalt Visibility to Visible and check the visibility state',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
