/************ Party ***************/
import db from '../model/db.js'


// Register a Party
const signupParty = (req, res) => {
    const {
        partyname,
        repname,
        logo,
        slogan
    } = req.body

    //CHECK EXISTING Party
    const query0 = "SELECT * FROM parties WHERE partyname = ?"

    db.query(query0, partyname, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            return res.status(409).json("Party Already exists!")
        } else {

            const query = "INSERT INTO parties(partyname, repname, logo, slogan) VALUES(?,?,?,?)"

            const data = [
                partyname,
                repname,
                logo,
                slogan
            ]

            /// send user info to database
            db.query(query, [...data], (err, data) => {
                if (err) return res.json(err)
                return res.json(data)
            })
        }

    })

}

// Get All Parties Data
const getAllParties = (req, res) => {
    const query = "SELECT * FROM parties"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Get a Single Party Data
const getParty = (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM parties WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Delete a Party
const deleteParty = (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM parties WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Update Party
const updateParty = (req, res) => {

    const { id } = req.params
    const {
        partyname,
        repname,
        logo,
        slogan
    } = req.body

    const query = "UPDATE parties SET partyname = ?, repname = ?, logo = ?, slogan = ? WHERE _id = ? "
    const values = [
        partyname,
        repname,
        logo,
        slogan,
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

// Search for Party Data
const searchParty = (req, res) => {
    const { key } = req.params
    const input = "%" + key + "%"
    const query = "SELECT * FROM parties WHERE partyname LIKE ? or repname LIKE ?"
    const keys = [
        input, input
    ]
    db.query(query, [...keys], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
            // console.log(data, "response")
    })
}


export {
    signupParty,
    getAllParties,
    getParty,
    updateParty,
    deleteParty,
    searchParty
}