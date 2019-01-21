const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|tsx?|ts?)$'

const moduleNameMapper = {
  '^@static(.*)$': '<rootDir>/static@$1',
  '^@advert(.*)$': '<rootDir>/components/@advert@$1',
  '^@auth(.*)$': '<rootDir>/components/@auth@$1',
  '^@communication(.*)$': '<rootDir>/components/@communication@$1',
  '^@config(.*)$': '<rootDir>/lib/@config@$1',
  '^@core(.*)$': '<rootDir>/components/@core@$1',
  '^@helpers(.*)$': '<rootDir>/lib/@helpers@$1',
  '^@layout(.*)$': '<rootDir>/components/@layout@$1',
  '^@postcss(.*)$': '<rootDir>/lib/@postcss@$1',
  '^@user(.*)$': '<rootDir>/components/@user@$1',
  '\\.(css|less)$': 'identity-obj-proxy'
}

module.exports = {
  testRegex: TEST_REGEX,
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.next/'],
  globals: {
    'babel-jest': {
      tsConfigFile: 'tsconfig.jest.json'
    }
  },
  transform: {
    '\\.(js)?$': 'babel-jest',
    '\\.(tsx|ts)?$': 'babel-jest'
  },
  moduleNameMapper,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'd.ts', '.json']
}
