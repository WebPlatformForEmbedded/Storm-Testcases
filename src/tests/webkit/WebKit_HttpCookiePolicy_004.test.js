import baseTest from './WebKit_HttpCookiePolicy_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      value: 'exclusivelyfrommaindocumentdomain',
    },
    title: 'Webkit HTTP Cookie Policy- 004',
    description:
      'Set Cookie policy to exclusivelyfrommaindocumentdomain and check whether the same is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
