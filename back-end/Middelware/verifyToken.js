const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.json({
            success:false,
            message : "Access denied Token missing"
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        res.status(400).json({
            success:false,
            message : "invlid token"
        })
    }
}

