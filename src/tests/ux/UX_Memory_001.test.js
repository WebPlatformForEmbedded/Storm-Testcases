import baseTest from '../webkit/WebKit_Memory_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      MAX_MEMORY: 25, //Mb
      CALLSIGN: 'UX',
      URL: 'about:blank',
      resume: false,
      SLEEP: 10,
    },
    title: 'UX Memory test 001',
    description: 'Check suspended memory usage of UX',
  },
}
