import JWT from 'jsonwebtoken';

export const Token = (userId) => {
    return JWT.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '2d' }
    );
};

export const verifyAccessToken = (userId) =>{
    return JWT.verify({
        userId
    }, process.env.JWT_SECRET)
}
