import baseTest from './Youtube_Playback_004.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=TdpBRZ0dZhw&resume',
    },
    plugin: [
      constants.youTubePlugin,
      constants.snapshotPlugin,
      constants.webKitBrowserPlugin,
      constants.uxplugin,
    ],
    title: 'YouTube Playback test - 005',
    description: 'Start playback of a VP9-1080p30Hz Asset and run for 30 mins',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{ description: 'Check if Youtube is playing VP9-1080p30Hz Asset for 30 minutes' },
        }
      }
      return step
    }),
  },
}
