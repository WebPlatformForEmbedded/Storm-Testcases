import baseTest from './Youtube_Playback_013.test'

export default {
  ...baseTest,
  ...{
    context: {
      //TODO - URL to be updated to AVC-1080p@60 Asset
      url: 'https://www.youtube.com/tv#/watch/video/control?v=wggaaecdAac&resume',
    },
    title:
      'Youtube - Forward and Backward inside the buffer of AVC-1080p@60 Asset for 30 minutes and check there is no issue in video playback',
    description:
      'Start playback of a AVC-1080p@60 Asset on YouTube and forward and backward inside the buffer',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{
            description:
              'Check if Youtube is playing AVC-1080p@60 Asset even after forward and backward keys pressed inside the buffer',
          },
        }
      }
      return step
    }),
  },
}
