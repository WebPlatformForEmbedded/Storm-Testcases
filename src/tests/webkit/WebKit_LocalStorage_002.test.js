import baseTest from './WebKit_HttpCookiePolicy_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      status: 'false',
    },
    title: 'Webkit Local Storage - 002',
    description: 'Set the Local storage status to false and check whether the same is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
