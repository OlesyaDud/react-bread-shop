import jwt from 'jsonwebtoken';

// passing id, because this is what payload will get
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,  {
        expiresIn: '30d'
    })
};

export default generateToken;