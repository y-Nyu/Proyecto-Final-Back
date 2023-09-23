const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt");
const client = new PrismaClient();


async function authorization(req, res, next)
{
    try
    {
        const {email, password} = req.body;

        const user = await client.user.findFirst({
            email,
        });

        if(!user) throw Error("No such user in the database");

        const isCorrect = bcrypt.compareSync(password, user.password);
        
        if(!isCorrect) throw Error("Incorrect password");

        next();
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }

}

module.exports = authorization;