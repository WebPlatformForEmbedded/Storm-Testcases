import baseTest from './TraceControl_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Trace Control - 003',
    description:
      'Set the Trace of Plugin with Category as Error and check whether the Category is set or not',
    context: {
      module: 'Plugin_Monitor',
      category: 'Error',
      state: 'enabled',
    },
  },
}
