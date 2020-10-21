import baseTest from './Youtube_Playback_004.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=TdpBRZ0dZhw&resume',
    },
    title: 'YouTube Playback test - 018',
    description: 'Start playback of a VP9-1080p30Hz Asset and forward/backward outside the buffer',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{
            description:
              'Check if Youtube is playing VP9-1080p30Hz Asset after forward/backward keys pressed outside the buffer',
          },
        }
      }
      return step
    }),
  },
}
