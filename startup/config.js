const helmet = require('helmet');
const cors = require('cors');

module.exports = function (app, express) {
    // set necessary configs to run application
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
}