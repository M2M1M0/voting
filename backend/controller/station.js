/************ Station ***************/
import db from '../model/db.js'



// Register Station
const registerStation = (req, res) => {
    const {
        stationname,
        admin,
        contact
    } = req.body

    //CHECK EXISTING Station
    const query0 = "SELECT * FROM users WHERE username = ?"

    db.query(query0, username, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            return res.status(409).json("User Already exists!")
        } else {
            /// send user info to database
            const query = "INSERT INTO stations(stationname, admin, contact) VALUES(?,?,?)"
            const data = [
                stationname,
                admin,
                contact
            ]
            db.query(query, [...data], (err, data) => {
                if (err) return res.json(err)
                return res.json(data)
            })
        }
    })


}

// Get All Stations 
const getAllStations = (req, res) => {
    const query = "SELECT * FROM stations"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Get a single Station
const getStation = (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM stations WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Get update Station
const updateStation = (req, res) => {
    const { id } = req.params
    const {
        stationname,
        admin,
        contact
    } = req.body

    const query = "UPDATE stations SET stationname = ?, admin = ?, contact = ? WHERE _id = ? "
    const values = [
        stationname,
        admin,
        contact,
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

// Delete Station
const deleteStation = (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM stations WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

// Search for Station Data
const searchStation = (req, res) => {
    const { key } = req.params
    const input = "%" + key + "%"
    const query = "SELECT * FROM stations WHERE stationname LIKE ? or contact LIKE ?"
    const keys = [
        input, input
    ]
    db.query(query, [...keys], (err, data) => {
        if (err) return res.json(err)
        res.json(data)
            // console.log(data, "response")
    })
}




/************ Parties participate stations ***************/
// Add Stations parties participate
const addParticipateIn = (req, res) => {
    const { stationname, partyname } = req.body
    const query = "INSERT INTO participateIn(partyname, stationname) VALUES(?,?)"

    const data = [partyname, stationname]
    db.query(query, [...data], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

// Get parties participateIn Stations
const getAllparticipateIn = (req, res) => {
    const query = "SELECT * FROM participateIn"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// get a single party participateIn Stations
const getParticipateIn = (req, res) => {
    const { partyname } = req.params
    const query = "SELECT * FROM participateIn WHERE partyname = ?"
    db.query(query, partyname, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

// Delete a single party participateIn Stations
const deleteParticipateIn = (req, res) => {
    const { id } = req.params
    const query = "DELETE FROM participateIn WHERE _id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}


export {
    registerStation,
    getAllStations,
    getStation,
    updateStation,
    deleteStation,
    searchStation,
    addParticipateIn,
    getAllparticipateIn,
    getParticipateIn,
    deleteParticipateIn
}