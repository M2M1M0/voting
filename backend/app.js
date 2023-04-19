require("dotenv").config()
const express = require('express')
const cors = require('cors')
const { genSaltSync, hashSync } = require('bcryptjs')
const db = require('./db')


// Init app
const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello fom backend')
})

/************ Admin ***************/
// Register Station
app.post('/regStation', (req, res) => {
    const {
        stationname,
        admin
    } = req.body

    /// send user info to database
    const query = "INSERT INTO stations(stationname, admin) VALUES(?,?)"
    const data = [
        stationname,
        admin
    ]
    db.query(query, [...data], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Get All Stations Data
app.get("/stations", (req, res) => {
    const query = "SELECT * FROM stations"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})





/************ Admin ***************/
// Register Admin
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

    // console.log(req.body)

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
})

// Get All Admins Data
app.get("/admins", (req, res) => {
    const query = "SELECT * FROM users WHERE userRole = 'administrator'"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Get a Single Admin Data
app.get('/admin/:id', (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM users WHERE _id = ? and userRole = 'administrator' "
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Update Admin
app.put('/updateAdmin/:id', (req, res) => {

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

})

// Delete admin
app.delete("/admin/:id", (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM users WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})





/************ Party ***************/
// Register a Party
app.post('/signupParty', (req, res) => {
    const {
        partyname,
        repname,
        logo,
        slogan,
        station
    } = req.body

    console.log(req.body)

    /// send user info to database
    const query = "INSERT INTO  " +
        "parties(partyname, repname, logo, slogan, station) " +
        "VALUES(?,?,?,?,?)"

    const data = [
        partyname,
        repname,
        logo,
        slogan,
        station
    ]
    db.query(query, [...data], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Get All Parties Data
app.get("/parties", (req, res) => {
    const query = "SELECT * FROM parties"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Get a Single Party Data
app.get('/party/:id', (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM parties WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Delete a Party
app.delete("/party/:id", (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM parties WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Update Party
app.put('/updateParty/:id', (req, res) => {

    const { id } = req.params
    const {
        partyname,
        repname,
        logo,
        slogan,
        station
    } = req.body

    const query = "UPDATE parties SET partyname = ?, repname = ?, logo = ?, slogan = ?, station = ? WHERE _id = ? "
    const values = [
        partyname,
        repname,
        logo,
        slogan,
        station,
        id
    ]

    db.query(query, [...values], (err, data) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        return res.json(data)
    })

})






/************ Voter ***************/
// Register Voter
app.post('/signupVoter', (req, res) => {
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
})

// Get All Voters Data
app.get("/voters", (req, res) => {
    const query = "SELECT * FROM users WHERE userRole = 'voter' "
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Get a Single Voter Data
app.get('/voter/:id', (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM users WHERE _id = ? and userRole = 'voter' "
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})

// Update Voter
app.put('/updateVoter/:id', (req, res) => {

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

})

// Delete Voter
app.delete("/voter/:id", (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM users WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})




// Listening...        
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})










// routes   
// app.use('/api/admi  n', require('./server/router/adminRouter'))
// app.use('/api/admi  n', require('./server/router/adminRouter'))