import baseTest from './PowerPlugin_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Power Plugin - 003',
    description: 'Sets the Power state to passivestandby and validate the result',
    context: {
      powerState: 'passivestandby',
      timeOut: 1,
    },
  },
}
