/************ Admin ***************/
import db from '../model/db.js'
import pkg from 'bcryptjs'
const { genSaltSync, hashSync } = pkg

// Register Admin
const signupAdmin = (req, res) => {
    const {
        fname,
        midname,
        lname,
        phone,
        email,
        station,
        gender,
        dob,
        username,
        password,
        conpassword,
        userRole
    } = req.body

    // console.log(req.body)
    //CHECK EXISTING USER
    const query0 = "SELECT * FROM users WHERE username = ?"

    db.query(query0, username, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            return res.status(409).json("User Already exists!")
        } else {

            if (password != conpassword) {
                console.log("password not match")
                return res.json({
                    Error: 0,
                    message: "Password don't match"
                })
            }

            const salt = genSaltSync(10)
            const hashedPassword = hashSync(password, salt)

            /// send user info to database
            const query = "INSERT INTO  " +
                "users(fname, midname, lname, phone, email, station, gender, dob, username, password, userRole) " +
                "VALUES(?,?,?,?,?,?,?,?,?,?,?)"
            const data = [
                fname,
                midname,
                lname,
                phone,
                email,
                station,
                gender,
                dob,
                username,
                hashedPassword,
                userRole
            ]
            db.query(query, [...data], (err, data) => {
                if (err) return res.json(err)
                return res.json(data)
            })

        }

    })


}

// Get All Admins Data
const getAdmins = (req, res) => {
    const query = "SELECT * FROM users WHERE userRole = 'administrator'"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Get a Single Admin Data
const getAdmin = (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM users WHERE _id = ? and userRole = 'administrator' "
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Update Admin
const updateAdmin = (req, res) => {

    const { id } = req.params
    const {
        fname,
        midname,
        lname,
        phone,
        email
    } = req.body

    const query = "UPDATE users SET fname = ?, midname = ?, lname = ?, phone = ?, email = ? WHERE _id = ? "
    const values = [
        fname,
        midname,
        lname,
        phone,
        email,
        id
    ]

    db.query(query, [...values], (err, data) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        return res.json(data)
    })
}

// Delete admin
const deletedmin = (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM users WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Search for Admin Data
const searchAdmin = (req, res) => {
    const { key } = req.params
    const query = "SELECT * FROM users WHERE fname LIKE ?  or phone LIKE ? and userRole = 'administrator' "
    const keys = [
        key, key, key, key
    ]
    db.query(query, [...keys], (err, data) => {
        if (err) return res.json(err)
        res.json(data)
            // console.log(data, "response")
    })
}


export {
    signupAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deletedmin,
    searchAdmin
}