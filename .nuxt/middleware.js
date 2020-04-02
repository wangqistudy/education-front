const middleware = {}

middleware['cookieParser'] = require('../middleware/cookieParser.js')
middleware['cookieParser'] = middleware['cookieParser'].default || middleware['cookieParser']

export default middleware
