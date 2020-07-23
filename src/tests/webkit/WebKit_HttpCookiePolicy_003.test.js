import baseTest from './WebKit_HttpCookiePolicy_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      value: 'onlyfrommaindocumentdomain',
    },
    title: 'Webkit HTTP Cookie Policy- 003',
    description:
      'Set Cookie policy to onlyfrommaindocumentdomain and check whether the same is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
