import express from 'express'
import { login, logout } from '../controller/auth.js'


const userAuthRouter = express.Router()

// Login
userAuthRouter.post("/login", login)

// Logout
userAuthRouter.post("/logout", logout)

export default userAuthRouter