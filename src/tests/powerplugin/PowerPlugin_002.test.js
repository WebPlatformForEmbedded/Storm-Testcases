import baseTest from './PowerPlugin_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Power Plugin - 002',
    description: 'Sets the Power state to activestandby and validate the result',
    context: {
      powerState: 'activestandby',
      timeOut: 1,
    },
  },
}
