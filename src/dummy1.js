export default {
  title: 'Dummy test 1',
  description: 'Dummy test 1',
  steps: [
    {
      description: 'Step 1',
      test: x => x,
      params: 1,
      assert: 1,
    },
    {
      description: 'Step 2',
      test: x => x,
      params: 1,
      assert: 1,
      sleep: 2,
    },
    {
      description: 'Step 3',
      test: x => x,
      params: 1,
      assert: 1,
      repeat: 2,
    },
  ],
}
