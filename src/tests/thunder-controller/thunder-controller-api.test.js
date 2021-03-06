import constants from '../../commonMethods/constants'

const apiCalls = [
  { plugin: 'foo', method: 'foo', params: 'bar' },
  { plugin: ' ', method: ' ', params: ' ' },
  { plugin: true, method: true, params: true },
  { plugin: 0, method: 0, params: 0 },
  { plugin: '\x00', method: '\x00', params: '\x00' },
  {
    plugin: '_?":{}]!@#$%^&*()_+`~.,',
    method: '_?":{}]!@#$%^&*()_+`~.,',
    params: '_?":{}]!@#$%^&*()_+`~.,',
  },
  {
    plugin:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    method:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    params:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    plugin: '//////////////////////////',
    params: '//////////////////////////',
    method: '//////////////////////////',
  },
  {
    plugin: 'a/?a&b?32=&param=oops=what=are=we=doing?',
    params: { s: 'a/?a&b?32=&param=oops=what=are=we=doing? ' },
  },
  { plugin: 'Controller', method: '_?":{}]!@#$%^&*()_+`~.,', params: '_?":{}]!@#$%^&*()_+`~.,' },
  { plugin: 'Controller', method: ' ', params: ' ' },
  { plugin: 'Controller', method: true, params: true },
  { plugin: 'Controller', method: 0, params: 0 },
  { plugin: 'Controller', method: '\x00', params: '\x00' },
  { plugin: 'Controller', method: 'activate', params: '' },
  { plugin: 'Controller', method: 'deactivate', params: '' },
  { plugin: 'Controller', method: 'discover', params: '' },
  {
    plugin: 'Controller',
    method: 'activate',
    params: { s: { s: { s: { s: { s: { s: { s: '' } } } } } } },
  },
  {
    plugin: 'Controller',
    method: { s: { s: { s: { s: { s: { s: { s: '' } } } } } } },
    params: { s: ' ' },
  },
]

export default {
  title: 'Thunder JSON-RPC API tests',
  description: 'Test the JSON RPC interface',
  plugin: [constants.controllerPlugin],
  setup() {
    this.$data.write('calls', apiCalls)
  },
  repeat() {
    this.$log(`Sending ${apiCalls.length} calls`)
    return apiCalls.length - 1
  },
  steps: [
    {
      description: 'Send custom call to Thunder',
      test() {
        const calls = this.$data.read('calls')
        const current = calls.pop()
        this.$data.write('calls', calls)

        this.$log('Sending', current)

        return this.$thunder.api
          .call(current.plugin, current.method, current.params)
          .then(() => true)
          .catch(err => {
            this.$log('Thunder response', err)
            // errors are OK in this test, continue
            return true
          })
      },
      assert: true,
    },
    {
      description: 'Check if Controller still responds',
      test() {
        return this.$thunder.api
          .call('Controller', 'status')
          .then(() => true)
          .catch(err => err)
      },
      assert: true,
    },
  ],
}
