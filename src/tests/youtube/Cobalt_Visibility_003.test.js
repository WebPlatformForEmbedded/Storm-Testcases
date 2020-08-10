import baseTest from './Cobalt_Visibility_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'invalid',
    },
    title: 'Cobalt Visibility - 003',
    description: 'Set Cobalt Visibility to invalid and validate the result',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
