import baseTest from './WebKit_EME_001.test'
import constants from '../../../../../../../Storm-CLI/testcases/Storm-Testcases/src/commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      url: `${constants.host}/app?type=playready`,
    },
    title: 'WPEWebkit EME Playready test',
    description: 'Loads Playready on the WPE Webkit',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to Playready' } }
      }
      return step
    }),
  },
}
