const prisma = require("../db");
const bcrypt = require("bcrypt");
const {ADMIN_PAGES} = require("../utils/utils")


async function authorization(req, res, next)
{
    try
    {
        const {email, password} = req.body;

        const user = await prisma.user.findFirst({
            where: {
                email,
            }            
        
        });



        // We check user is in the data base and, if in db, we check password is correct
        if(!user) throw Error("No such user in the database");
        
        const isCorrect = bcrypt.compareSync(password, user.password);
        
        if(!isCorrect) throw Error("Incorrect password");


        // If everything went well, then we check privileges
        if(ADMIN_PAGES.includes(req.path))
        {
            if(user.rol !== "ADMIN") 
            {
                return res.status(401).json({message: "Not sufficient privileges"})
            }

        }


        next();
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }

}

module.exports = authorization;