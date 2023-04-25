import express from 'express'
import {
    submitVote,
    getCandidates,
    getAllCandidates,
    getVotes
} from '../controller/votes.js'
const voteRouter = express.Router()



// Give Vote
voteRouter.post("/submitVote", submitVote)

// Get Vote
voteRouter.get("/", getVotes)

//Get Candidates
voteRouter.get("/candidates/:station", getCandidates)

//Get All Candidates
voteRouter.get("/candidates", getAllCandidates)



export default voteRouter