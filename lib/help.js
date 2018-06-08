const chalk = require('chalk');
const strip = require('strip-ansi');
const table = require('text-table');

module.exports = {
  help(flags) {
    const rows = [];
    const options = {
      align: ['l', 'l'],
      stringLength(str) {
        return strip(str).length;
      },
    };

    for (const flagName of Object.keys(flags)) {
      const flag = flags[flagName];
      let { desc } = flag;
      const { deprecated } = flag;

      if (deprecated) {
        desc = chalk`{bold Deprecated.} Please use ${deprecated}.\n${desc}`;
      }

      const lines = desc.split('\n');
      const [description] = lines.splice(0, 1);

      rows.push([`  --${flagName}`, description]);

      if (lines.length > 0) {
        for (const line of lines) {
          rows.push(['', line]);
        }
      }
    }

    return table(rows, options);
  },
};
