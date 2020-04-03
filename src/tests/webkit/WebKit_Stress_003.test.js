import baseTest from './WebKit_Stress_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'http://cdn.metrological.com/static/storm/app_redirect1.html',
    },
    title: 'WPEWebkit stability redirect test',
    description:
      'Stress loads the system with redirects and see if the WPEWebkit process continues to operate nominally',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
