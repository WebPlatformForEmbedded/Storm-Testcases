import baseTest from './Youtube_Playback_013.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      //TODO - URL to be updated to AVC-1080p@60 Asset
      url: 'https://www.youtube.com/tv#/watch/video/control?v=wggaaecdAac&resume',
    },
    plugin: [
      constants.youTubePlugin,
      constants.snapshotPlugin,
      constants.webKitBrowserPlugin,
      constants.uxplugin,
    ],
    title: 'YouTube Playback test - 016',
    description:
      'Start playback of a AVC-1080p@60 Asset and forward and backward inside the buffer',
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
