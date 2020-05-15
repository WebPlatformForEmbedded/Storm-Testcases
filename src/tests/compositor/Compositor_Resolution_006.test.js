import baseTest from './Compositor_Resolution_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      resolution: '1080i50',
    },
    title: 'Compositor Resolution - 006',
    description:
      'Sets the resolution to 1080i50 and checks whether the same resolution is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
