import baseTest from './WebKit_EME_Stress_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'http://cdn.metrological.com/static/eme-v3-clean.html',
    },
    title: 'WPEWebkit EME Playready test',
    description: 'Loads Playready on the WPE Webkit',
    steps: baseTest.steps.map((step, index) => {
      if (index === 2) {
        return { ...step, ...{ description: 'Repeat for 30 times', repeat: 30 } }
      }
      return step
    }),
  },
}
