import baseTest from './Youtube_Playback_013.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=TdpBRZ0dZhw&resume',
    },
    title: 'YouTube Playback test - 014',
    description:
      'Start playback of a VP9-1080p30Hz Asset and forward and backward inside the buffer',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{
            description:
              'Check if Youtube is playing VP9-1080p30Hz Asset even after forward and backward keys pressed inside the buffer',
          },
        }
      }
      return step
    }),
  },
}
