import baseTest from './TraceControl_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Trace Control - 002',
    description:
      'Set the Trace of Plugin with state as tristated and check whether the state is set or not',
    context: {
      module: 'Plugin_Monitor',
      category: 'Information',
      state: 'tristated',
    },
  },
}
