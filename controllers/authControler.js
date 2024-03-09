import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import bcrypt from 'bcryptjs'
import {comparePassword, hashPasswords} from "../utils/passwordUtils.js"
import { UnauthenticatedError, BadRequestError } from "../errors/customError.js"
import { createJWT } from "../utils/tokenUtils.js"

export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount ? 'admin' : 'user'
    
    const hashPassword = await (hashPasswords(req.body.password))
    req.body.password = hashPassword
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({msg: 'user created'})
    res.send('register')
}

export const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    const inValidUser = 
    user && await comparePassword(req.body.password, user.password) 

    if (!inValidUser) throw new UnauthenticatedError('invalid credentials')

    const token = createJWT({userId: user._id, role: user.role})

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })

    res.status(StatusCodes.OK).json({msg: 'user logged success'})
}

export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())    
    })
    res.status(StatusCodes.OK).json({msg: 'user logout'})
}