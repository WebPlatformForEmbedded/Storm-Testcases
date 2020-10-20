import baseTest from './Framework_Provisioning_002.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    title: 'Framework provision test 003',
    description: 'Device provisioning stress test',
    plugin: [constants.provisioningPlugin],
    repeat: 30,
  },
}
