import baseTest from './Compositor_Resolution_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      resolution: '1080p50',
    },
    title: 'Compositor Resolution - 007',
    description:
      'Sets the resolution to 1080p50 and checks whether the same resolution is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
