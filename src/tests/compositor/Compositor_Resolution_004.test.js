import baseTest from './Compositor_Resolution_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      resolution: '720p60',
    },
    title: 'Compositor Resolution - 004',
    description:
      'Sets the resolution to 720p60 and checks whether the same resolution is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
