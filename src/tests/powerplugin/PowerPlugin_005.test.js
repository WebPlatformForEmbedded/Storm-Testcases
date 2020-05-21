import baseTest from './PowerPlugin_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Power Plugin - 005',
    description: 'Sets the Power state to hibernate and validate the result',
    context: {
      powerState: 'hibernate',
      timeOut: 1,
    },
  },
}
