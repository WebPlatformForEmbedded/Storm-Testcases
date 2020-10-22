import baseTest from './DisplayInfo_HdcpProtection_002.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      hdcpProtection: 'HdcpUnencrypted',
    },
    plugin: [constants.displayInfo],
    title: 'DisplayInfo - HDCP Protection - 004',
    description: 'Set HDCP Protection to HdcpUnencrypted and validate the result',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return {
          ...step,
          ...{ description: 'Set HDCP Protection to HdcpUnencrypted and validate the result' },
        }
      }
      return step
    }),
  },
}
