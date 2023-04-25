import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'

// Import Routes
import voterRouter from './router/voter.js'
import voteRouter from './router/votes.js'

import userAuthRouter from './router/auth.js'
import adminRouter from './router/admin.js'
import partyRouter from './router/party.js'
import {
    stationRouter,
    participateRouter
} from './router/station.js'

// Init app
const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Default / start page
app.get('/', (req, res) => {
    res.send('Hello fom backend')
})

// Register Routes
app.use("/voter", voterRouter)
app.use("/admin", adminRouter)
app.use("/auth", userAuthRouter)
app.use("/party", partyRouter)
app.use("/station", stationRouter)
app.use("/participateIn", participateRouter)
app.use("/vote", voteRouter)


// Listening...        
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})