import baseTest from './Compositor_Opacity_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      opacityValue: '0',
    },
    title: 'Compositor Client Opacity - 002',
    description: 'Sets the client Opacity to 0 and validates the result',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
