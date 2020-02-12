import baseTest from './Framework_Provisioning_002.test'

export default {
  ...baseTest,
  ...{
    title: 'Framework provision test 003',
    description: 'Device provisioning stress test',
    repeat: 30,
  },
}
