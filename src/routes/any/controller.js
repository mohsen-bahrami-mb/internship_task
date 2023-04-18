const Controller = require('../controller');

module.exports = new (class extends Controller {
    async getAny(req, res){
        this.response({res, message: 'we are good'});
    }
})();