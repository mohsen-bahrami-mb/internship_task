const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:main');

module.exports = function () {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.get('db.address'))
        .then(() => debug('connect to mongodb'))
        .catch(() => debug('could not connect to mongodb'));
}
