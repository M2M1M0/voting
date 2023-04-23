import express from 'express'
import {
    addParticipateIn,
    deleteParticipateIn,
    deleteStation,
    getAllparticipateIn,
    getAllStations,
    getParticipateIn,
    getStation,
    registerStation,
    updateStation,
    searchStation
} from '../controller/station.js'

const stationRouter = express.Router()
const participateRouter = express.Router()

// Register station
stationRouter.post("/signup", registerStation)

// Update station
stationRouter.put("/:id", updateStation)

// Get a Single station Data
stationRouter.get("/:id", getStation)

// Get all Stations
stationRouter.get("/", getAllStations)

// Delete a Station
stationRouter.delete("/:id", deleteStation)

// Search Station
stationRouter.get("/search/:key", searchStation)


//************** Participate **************/
// Register Participate                                                                                      
participateRouter.post("/signup", addParticipateIn)

// Get a Single party Participate station Data
participateRouter.get("/:partyname", getParticipateIn)

// Get all participate Station
participateRouter.get("/", getAllparticipateIn)

// Delete a party participate Station
participateRouter.delete("/:id", deleteParticipateIn)



export {
    stationRouter,
    participateRouter
}