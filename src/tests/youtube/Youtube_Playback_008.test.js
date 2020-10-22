import baseTest from './Youtube_Playback_004.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=KGEekP1102g&resume',
    },
    plugin: [
      constants.youTubePlugin,
      constants.snapshotPlugin,
      constants.webKitBrowserPlugin,
      constants.uxplugin,
    ],
    title: 'YouTube Playback test - 008',
    description: 'Start playback of a Live Vide Asset and run for 30 mins',
    steps: baseTest.steps.map((step, index) => {
      if (index === 4) {
        return {
          ...step,
          ...{ description: 'Check if Youtube is playing Live Video Asset for 30 minutes' },
        }
      }
      return step
    }),
  },
}
