const { validateFlag, validate } = require('../lib/validate');

const flagSchema = require('./fixtures/flags.json');

describe('validate', () => {
  test('validateFlag no type', () => {
    expect(validateFlag).toBeDefined();

    const result = validateFlag(flagSchema.help, true);
    expect(result).toBe(true);
  });

  test('validateFlag one type', () => {
    expect(validateFlag).toBeDefined();

    const result = validateFlag(flagSchema.content, 'batman');
    expect(result).toBe(true);
  });

  test('validateFlag many types', () => {
    expect(validateFlag).toBeDefined();

    let result = validateFlag(flagSchema.port, 8080);
    expect(result).toBe(true);

    result = validateFlag(flagSchema.port, '8080');
    expect(result).toBe(true);
  });

  test('validate all', () => {
    expect(validate).toBeDefined();
    const flags = flagSchema;
    const prefix = 'test';
    let argv = {};

    let result = validate({ argv, flags, prefix });
    expect(result).toBe(true);

    argv = { version: true };
    result = validate({ argv, flags, prefix });
    expect(result).toBe(true);

    argv = { devWare: {}, port: 8080 };
    result = validate({ argv, flags, prefix });
    expect(result).toBe(true);

    argv = { things: ['joker'] };
    result = validate({ argv, flags, prefix });
    expect(result).toBe(true);

    // alias for 'things' should be ignored
    argv = { batman: ['joker'] };
    result = validate({ argv, flags, prefix });
    expect(result).toBe(true);

    argv = { devWae: {} };
    result = validate({ argv, flags, prefix, throw: false });
    expect(result).toBe(false);

    argv = { devWare: true };
    let fn = () => validate({ argv, flags, prefix });
    expect(fn).toThrowErrorMatchingSnapshot();

    argv = { devWar: {} };
    fn = () => validate({ argv, flags, prefix });
    expect(fn).toThrowErrorMatchingSnapshot();
  });
});
