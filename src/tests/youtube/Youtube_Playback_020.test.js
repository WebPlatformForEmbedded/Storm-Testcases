import baseTest from './Youtube_Playback_004.test'

export default {
  ...baseTest,
  ...{
    context: {
      //TODO - URL to be updated to AVC-1080p@60 Asset
      url: 'https://www.youtube.com/tv#/watch/video/control?v=wggaaecdAac&resume',
    },
    title: 'YouTube Playback test - 020',
    description: 'Start playback of a AVC-1080p@60 Asset and forward/backward outside the buffer',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{
            description:
              'Check if Youtube is playing AVC-1080p@60 Asset after forward/backward keys pressed outside the buffer',
          },
        }
      }
      return step
    }),
  },
}
