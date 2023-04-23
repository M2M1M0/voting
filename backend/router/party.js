import express from 'express'
import {
    deleteParty,
    getAllParties,
    getParty,
    searchParty,
    signupParty,
    updateParty
} from '../controller/party.js'

const partyRouter = express.Router()

// Register Party
partyRouter.post("/signup", signupParty)

// Update Party
partyRouter.put("/:id", updateParty)

// Get a Single Party Data
partyRouter.get("/:id", getParty)

// Get all Parties
partyRouter.get("/", getAllParties)

// Delete a Party
partyRouter.delete("/:id", deleteParty)

// Search Admin
partyRouter.get("/search/:key", searchParty)



export default partyRouter