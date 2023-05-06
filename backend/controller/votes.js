/************ VOtes ***************/
import db from '../model/db.js'


const submitVote = (req, res) => {
    const {
        voterId,
        partyname,
        stationname
    } = req.body

    if (voterId === "" || partyname === "" || stationname === "") {
        return res.status(400).json("bad request")
    } else {

        db.query("SELECT * FROM votes WHERE voterId = ?", voterId, (err, data) => {
            if (err) return res.status(500).json(err)
                // console.log(data[0].voterId, "response")

            if (data.length) {
                // console.log(data[0], "Invalid second times")
                return res.status(409).json("Invalid for second time")

            } else {
                const query = "INSERT INTO votes(voterId, partyname, stationname) VALUES(?,?,?)"
                const data = [
                    voterId,
                    partyname,
                    stationname
                ]

                // console.log(data, "data")
                db.query(query, [...data], (err, data) => {
                    if (err) return res.status(500).json(err)
                    if (data) {
                        // console.log(data, "submitted response")
                        return res.json("Vote submitted")
                    }
                })
            }
        })
    }

}

const getVotes = (req, res) => {

    const query = "SELECT * FROM votes"

    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

const getCandidates = (req, res) => {

    const query =
        "SELECT * FROM " +
        "parties JOIN participateIn " +
        "ON parties.partyname = participateIn.partyname " +
        "WHERE stationname = ?"

    const { station } = req.params

    db.query(query, station, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}

const getAllCandidates = (req, res) => {

    const query =
        "SELECT * FROM " +
        "parties JOIN participateIn " +
        "ON parties.partyname = participateIn.partyname "

    db.query(query, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}


export {
    submitVote,
    getCandidates,
    getAllCandidates,
    getVotes
}