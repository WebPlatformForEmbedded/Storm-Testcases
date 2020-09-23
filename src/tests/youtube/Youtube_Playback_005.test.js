import baseTest from './Youtube_Playback_004.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=TdpBRZ0dZhw&resume',
    },
    title: 'Youtube- Playback of VP9-1080p30Hz Asset for 30 mins',
    description: 'Start playback of a VP9-1080p30Hz Asset on YouTube and let it run for 30 mins',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{ description: 'Check if Youtube is playing VP9-1080p30Hz Asset for 30 minutes' },
        }
      }
      return step
    }),
  },
}
