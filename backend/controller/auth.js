import {} from 'dotenv/config'
import db from '../model/db.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


export const login = (req, res) => {

    //CHECK USER
    const query = "SELECT * FROM users WHERE username = ?"

    db.query(query, [req.body.username], (err, data) => {
        if (err) return res.status(500).json("Network Error")

        if (data.length === 0) return res.status(404).json("User Not Found")

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        )

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong password")

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY)
        const { password, ...other } = data[0]

        const cookieOptions = {
            maxAge: new Date(
                Date.now() + (9 * 24 * 60 * 60 * 1000)
            ),
            httpOnly: true,
        }


        res.cookie("token", token, cookieOptions)
            .status(200)
            .json({...other })
    })
}


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
}


export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token

    if (!token) return res.status(401).json("You are not Authenticated")

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.status(403).json("Token is not Valid!")
        req.user = user
        next()
    })
}