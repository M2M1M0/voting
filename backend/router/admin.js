import express from 'express'
const adminRouter = express.Router()
import {
    deletedmin,
    getAdmin,
    getAdmins,
    signupAdmin,
    updateAdmin,
    searchAdmin
} from '../controller/admin.js'


// Register Admin
adminRouter.post("/signup", signupAdmin)

// Update Admin
adminRouter.put("/:id", updateAdmin)

// Get a Single Admin Data
adminRouter.get("/:id", getAdmin)

// Get all Admins
adminRouter.get("/", getAdmins)

// Delete a Admin
adminRouter.delete("/:id", deletedmin)

// Search Admin
adminRouter.get("/search/:key", searchAdmin)


export default adminRouter