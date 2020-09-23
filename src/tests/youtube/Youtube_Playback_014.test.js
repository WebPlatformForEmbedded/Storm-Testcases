import baseTest from './Youtube_Playback_013.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=TdpBRZ0dZhw&resume',
    },
    title:
      'Youtube - Forward and Backward inside the buffer of VP9-1080p30Hz Asset for 30 minutes and check there is no issue in video playback',
    description:
      'Start playback of a VP9-1080p30Hz Asset on YouTube and forward and backward inside the buffer',
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
