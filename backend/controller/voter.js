/************ Voter ***************/
import db from '../model/db.js'
import pkg from 'bcryptjs'
const { genSaltSync, hashSync } = pkg



// Register Voter
const sinupVoter = (req, res) => {
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

    //CHECK EXISTING USER
    const query0 = "SELECT * FROM users WHERE username = ?"

    db.query(query0, username, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            return res.status(409).json("User Already exists!")
        } else {

            if (password != conpassword) {
                // console.log("password not match")
                return res.status(408).json("Password don't match") ///// Change Diff in Password status
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

// Get a single voter
const getVoter = (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM users WHERE _id = ? and userRole = 'voter' "
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Get All Voters Data
const getAllVoters = (req, res) => {
    const query = "SELECT * FROM users WHERE userRole = 'voter' "
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Update Voter
const updateVoter = (req, res) => {

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

// Delete a Voter
const deleteVoter = (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM users WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Search for Voter Data
const searchVoter = (req, res) => {
    const { key } = req.params
    const input = "%" + key + "%"
    const query = "SELECT * FROM users WHERE userRole = 'voter' and ( fname LIKE ? or midname LIKE ? or lname LIKE ? or phone LIKE ? ) "
    const keys = [
        input, input, input, input
    ]
    db.query(query, [...keys], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
            // console.log(data, "response")
    })
}


export {
    sinupVoter,
    getAllVoters,
    getVoter,
    updateVoter,
    deleteVoter,
    searchVoter
}