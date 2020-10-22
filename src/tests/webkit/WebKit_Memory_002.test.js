import baseTest from './WebKit_Memory_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      MAX_MEMORY: 40, //Mb
      CALLSIGN: 'WebKitBrowser',
      URL: 'about:blank',
      resume: true,
      SLEEP: 10,
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'WPEWebkit Memory test 002',
    description: 'Check resumed memory usage of WebKitBrowser',
  },
}
