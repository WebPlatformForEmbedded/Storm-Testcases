import baseTest from './Youtube_Playback_009.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=TdpBRZ0dZhw&resume',
    },
    title: 'Youtube - Play-Pause the VP9-1080p30Hz Asset 5 times',
    description: 'Start playback of a VP9-1080p30Hz Asset on YouTube and play pause it for 5 times',
    steps: baseTest.steps.map((step, index) => {
      if (index === 5) {
        return {
          ...step,
          ...{
            description:
              'Check if Youtube is playing VP9-1080p30Hz Asset even if it is play-paused for 5 times',
          },
        }
      }
      return step
    }),
  },
}
