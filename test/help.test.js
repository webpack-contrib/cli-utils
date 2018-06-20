const { getHelp } = require('../lib/help');

const flagSchema = require('./fixtures/flags.json');

describe('help', () => {
  test('getHelp', () => {
    expect(getHelp).toBeDefined();
    expect(getHelp(flagSchema)).toMatchSnapshot();

    flagSchema.content.deprecated = true;
    expect(getHelp(flagSchema)).toMatchSnapshot();
  });
});
