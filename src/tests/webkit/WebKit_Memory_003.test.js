import baseTest from './WebKit_Memory_001.test.js'

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
    title: 'WPEWebkit Memory test 003',
    description: 'Load appstore and check memory usage',
  },
}
