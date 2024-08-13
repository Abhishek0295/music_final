import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 12)
        return hashedPassword
    } catch(err){ 
        console.log(err)
    }
}

export const decryptPassword = async ( password, hashPassword ) => {
    return bcrypt.compare( password, hashPassword )
}

