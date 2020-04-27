import baseTest from './VolumeControl_Volume_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      volume: '50',
    },
    title: 'VolumeControl Volume - 002',
    description: 'Set the Volume to 50 and check whether volume set to 50',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
