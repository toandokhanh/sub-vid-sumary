// const siteRouter = require('./site')
const videoRouter = require('./video')
const authRouter = require('./auth')

function route(APP) {
    // APP.use('/api', siteRouter);
    APP.use('/api/video', videoRouter);
    APP.use('/api/auth', authRouter);
    
}

module.exports = route;