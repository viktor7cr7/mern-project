import { BadRequestError, UnauthenticatedError } from "../errors/customError.js"
import { vefifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies
    console.log(req.cookies)
    if (!token) throw new UnauthenticatedError('authentication invalid')

    try {
        const {userId, role} = vefifyJWT(token)
        const testUser = userId === '65e8eef169a883707cd384b8'
        req.user = {userId, role, testUser}
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
}

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new UnauthenticatedError('Unauthorized to access this route')
        }
        next()
    }
}

export const checkForTestUser = (req,res,next) => {
    if(req.user.testUser) throw new BadRequestError('Demo user. Read only')
    next()
}