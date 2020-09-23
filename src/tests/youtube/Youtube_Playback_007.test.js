import baseTest from './Youtube_Playback_004.test'

export default {
  ...baseTest,
  ...{
    context: {
      //TODO - URL to be updated to AVC-1080p@60 Asset
      url: 'https://www.youtube.com/tv#/watch/video/control?v=wggaaecdAac&resume',
    },
    title: 'Youtube- Playback of AVC-1080p@60 Asset for 30 mins',
    description: 'Start playback of a AVC-1080p@60 Asset on YouTube and let it run for 30 mins',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{ description: 'Check if Youtube is playing AVC-1080p@60 Asset for 30 minutes' },
        }
      }
      return step
    }),
  },
}
