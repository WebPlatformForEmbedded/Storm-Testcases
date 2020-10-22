import baseTest from './TraceControl_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    title: 'Trace Control - 002',
    description:
      'Set the Trace of Plugin with state as tristated and check whether the state is set or not',
    plugin: [constants.traceControlPlugin],
    context: {
      module: 'Plugin_Monitor',
      category: 'Information',
      state: 'tristated',
    },
  },
}
