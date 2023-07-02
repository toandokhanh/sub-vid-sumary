const siteRouter = require('./site')
const videoRouter = require('./video')

function route(APP) {
    APP.use('', siteRouter);
    APP.use('/video', videoRouter);
}

module.exports = route;