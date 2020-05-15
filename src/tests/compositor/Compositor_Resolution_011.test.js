import baseTest from './Compositor_Resolution_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      resolution: 'unknown',
    },
    title: 'Compositor Resolution - 011',
    description:
      'Sets the resolution to unknown and checks whether the same resolution is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
