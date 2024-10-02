const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const locale = require('dayjs/locale/hu');
dayjs.extend(utc);

module.exports = (date) => {
  return dayjs(date).utc().locale('hu').format('YYYY. MMMM D. - HH:mm');
};
