export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^.+\\.css$': 'identity-obj-proxy'
  },
  extensionsToTreatAsEsm: ['.jsx'],
  transform: {
    '^.+\\.(jsx?)$': ['babel-jest', { presets: ['@babel/preset-react'] }]
  }
}
