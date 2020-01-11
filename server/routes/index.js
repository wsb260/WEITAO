const User = require('./user')
const Rights = require('./rights')
module.exports = app => {
    app.use('/',User);
    app.use('/',Rights)
}