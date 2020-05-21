import baseTest from './PowerPlugin_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Power Plugin - 004',
    description: 'Sets the Power state to suspendtoram and validate the result',
    context: {
      powerState: 'suspendtoram',
      timeOut: 1,
    },
  },
}
