import baseTest from './Youtube_Playback_004.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/control?v=wggaaecdAac&resume',
    },
    plugin: [
      constants.youTubePlugin,
      constants.snapshotPlugin,
      constants.webKitBrowserPlugin,
      constants.uxplugin,
    ],
    title: 'YouTube Playback test - 006',
    description: 'Start playback of a AVC-1080p@30 Asse and run for 30 mins',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{ description: 'Check if Youtube is playing AVC-1080p@30 Asset for 30 minutes' },
        }
      }
      return step
    }),
  },
}
