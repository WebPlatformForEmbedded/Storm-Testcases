import baseTest from './BluetoothControl_Scan_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      deviceType: 'Classic',
      timeOut: 10,
    },

    title: 'Bluetooth Control - Scan 003',
    description: 'Check the Scan Functionality of Bluetooth Control Module for Classic devices',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
