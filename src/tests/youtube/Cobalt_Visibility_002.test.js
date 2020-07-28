import baseTest from './Cobalt_Visibility_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'visible',
    },
    title: 'Cobalt Visibility - 002',
    description: 'Set Cobalt Visibility to visible and validate the result',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
