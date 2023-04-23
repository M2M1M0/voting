import express from 'express'
const voterRouter = express.Router()
import {
    getVoter,
    getAllVoters,
    sinupVoter,
    updateVoter,
    deleteVoter,
    searchVoter
} from '../controller/voter.js'


// Register Voter
voterRouter.post("/signup", sinupVoter)

// Update Voter
voterRouter.put("/:id", updateVoter)

// Get a Single Voter Data
voterRouter.get("/:id", getVoter)

// Get all voters
voterRouter.get("/", getAllVoters)

// Delete a voter
voterRouter.delete("/:id", deleteVoter)

// Search voter
voterRouter.get("/search/:key", searchVoter)



export default voterRouter