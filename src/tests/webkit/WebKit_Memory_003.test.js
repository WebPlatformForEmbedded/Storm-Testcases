import baseTest from './WebKit_Memory_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      MAX_MEMORY: 80, //Mb
      CALLSIGN: 'WebKitBrowser',
      URL:
        'https://widgets.metrological.com/lightning/metrological/f5d28e6d86c88193fcbf50602c6a30ec',
      resume: true,
      SLEEP: 30,
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'WPEWebkit Memory test 003',
    description: 'Load appstore and check memory usage',
  },
}
