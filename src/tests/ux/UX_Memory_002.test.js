import baseTest from '../webkit/WebKit_Memory_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      MAX_MEMORY: 40, //Mb
      CALLSIGN: 'UX',
      URL: 'about:blank',
      resume: true,
      SLEEP: 10,
    },
    plugin: [constants.uxplugin],
    title: 'UX Memory test 002',
    description: 'Check resumed memory usage of UX',
  },
}
