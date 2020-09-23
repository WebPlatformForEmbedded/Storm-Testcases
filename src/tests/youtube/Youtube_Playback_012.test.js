import baseTest from './Youtube_Playback_004.test'

export default {
  ...baseTest,
  ...{
    context: {
      //TODO - URL to be updated to AVC-1080p@60 Asset
      url: 'https://www.youtube.com/tv#/watch/video/control?v=wggaaecdAac&resume',
    },
    title: 'Youtube - Play-Pause the AVC-1080p@60 Asset 5 times',
    description: 'Start playback of a AVC-1080p@60 Asset on YouTube and play pause it for 5 times',
    steps: baseTest.steps.map((step, index) => {
      if (index === 5) {
        return {
          ...step,
          ...{
            description:
              'Check if Youtube is playing AVC-1080p@60 Asset even if it is play-paused for 5 times',
          },
        }
      }
      return step
    }),
  },
}
