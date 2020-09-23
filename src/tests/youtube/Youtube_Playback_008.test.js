import baseTest from './Youtube_Playback_004.test'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://www.youtube.com/tv#/watch/video/idle?v=KGEekP1102g&resume',
    },
    title: 'Youtube- Playback of Live Video Asset for 30 mins',
    description: 'Start playback of a Live Vide Asset on YouTube and let it run for 30 mins',
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
