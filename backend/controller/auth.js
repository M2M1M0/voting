import {} from 'dotenv/config'
import db from '../model/db.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = (req, res) => {


    //CHECK USER
    const query = "SELECT * FROM users WHERE username = ?"

    db.query(query, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!")

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        )

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!")

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY)
        const { password, ...other } = data[0]

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
}