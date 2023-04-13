require("dotenv").config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const { genSaltSync, hashSync } = require('bcryptjs')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Voting"
})

// Init app
const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello fom backend')
})

// Get All users Data
app.get("/admins", (req, res) => {
    const query = "SELECT * FROM users"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Admin Registration
app.post('/signupAdmin', (req, res) => {
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

    console.log(req.body)

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
        "users(firstname, middlename, lastname, phone, email, station, gender, dob, username, password, userRole) " +
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
})


app.post("/login", async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.json({
            message: "Please Provide an email and password"
        })
    }
    try {
        //
        const query = "SELECT * FROM users WHERE username = ?"
        await db.query(query, username, (err, data) => {
            if (err) return res.json(err)
            console.log(data)
            return res.json(data)
        })
        if (!compareSync(password, results.password)) {
            res.json({
                message: 'Incorrect Password!'
            })
        } else {
            const id = results._id
                // console.log("Login user ID "+id)
            const token = jwt.sign({ id: id }, 'secretjn87y78h76uoihrQ32a32@ez4323tbjhbyugyu', {
                    expiresIn: '9d'
                })
                //   console.log("the token is " + token)

            const cookieOptions = {
                maxAge: new Date(
                    Date.now() + (9 * 24 * 60 * 60 * 1000)
                ),
                httpOnly: true,


            }
            res.cookie('adminSave', token, cookieOptions)
            res.render('admin', {
                    title: 'Admin Page'
                })
                // return res.json('Welcome too admin page')
        }


    } catch (err) { console.log(err) }


})






// Listening...        
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})










// routes   
// app.use('/api/admi  n', require('./server/router/adminRouter'))