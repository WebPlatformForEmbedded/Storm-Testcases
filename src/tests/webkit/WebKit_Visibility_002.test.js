import baseTest from './WebKit_Visibility_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'visible',
    },
    title: 'Webkit Visibility - 002',
    description: 'Set Webkit Visibility to Visible and check the visibility state',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
