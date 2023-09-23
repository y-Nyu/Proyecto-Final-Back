const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
const nonSecure = require("./no_secure");

function authenticate(req, res, next)
{
    try
    {   

        if(nonSecure.includes(req.path)) 
        {
            next();
        }


        const token = req.headers.authorization;
        
        if(!token)
        {
            return res.status(400).send("Unexpected token");
        }

        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified.id;

        next()
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }

}

module.exports = authenticate;