import baseTest from './Youtube_Playback_013.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/control?v=wggaaecdAac&resume',
    },
    title: 'YouTube Playback test - 015',
    description:
      'Start playback of a AVC-1080p@30 Asset and forward and backward inside the buffer',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{
            description:
              'Check if Youtube is playing AVC-1080p@30  Asset even after forward and backward keys pressed inside the buffer',
          },
        }
      }
      return step
    }),
  },
}
