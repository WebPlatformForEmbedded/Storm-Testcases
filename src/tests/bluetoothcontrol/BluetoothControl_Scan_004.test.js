import baseTest from './BluetoothControl_Scan_001.test'

export default {
  ...baseTest,
  ...{
    context: {
      deviceType: 'Low Energy',
      timeOut: 20,
    },
    title: 'Bluetooth Control - Scan 004',
    description: 'Check the Scan Functionality of Bluetooth Control Module with modified timeout',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
