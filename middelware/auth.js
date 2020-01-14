const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    //Get token from Headers 
    const token = req.header('x-auth-token');

    //Check if there is no token
    if(!token){
        return res.status(401).json({msg:'NO token, authorization Denied'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        req.user = decoded.user
        next();
        
    } catch (err) {
        return res.status(401).json({msg:'Token is not valid'});

    }
}