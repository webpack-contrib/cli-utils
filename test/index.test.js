const { getOpts, getHelp, validate } = require('../lib/index');

const flagSchema = require('./fixtures/flags.json');

describe('index', () => {
  test('exports', () => {
    expect(getHelp).toBeDefined();
    expect(getOpts).toBeDefined();
    expect(validate).toBeDefined();
  });

  test('opts', () => {
    expect(getOpts(flagSchema)).toMatchSnapshot();
  });
});
