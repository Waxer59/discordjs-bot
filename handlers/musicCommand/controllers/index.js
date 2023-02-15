const { musicLoop } = require('./musicLoop');
const { musicPause } = require('./musicPause');
const { musicPlay } = require('./musicPlay');
const { musicShuffle } = require('./musicShuflle');
const { musicSkip } = require('./musicSkip');
const { musicStop } = require('./musicStop');

module.exports = {
  musicSkip,
  musicStop,
  musicLoop,
  musicShuffle,
  musicPause,
  musicPlay
};
