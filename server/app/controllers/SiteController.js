const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
    index(res, req, next ){
        req.send('Welcome Home');
    }
    contacts(res, req, next){
        req.send('welcome contacts')
    }
    
}

module.exports = new SiteController;