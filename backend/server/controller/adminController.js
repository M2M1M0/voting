const jwt = require('jsonwebtoken')
const Admin = require('../model/adminModel')

const { genSaltSync, hashSync, compareSync } = require('bcryptjs')

// module.exports = {
//     setUser: (req, res, next) => {
//         res.session.user = req.user
//         return next()
//     }
// }

module.exports = {
    Admin: (request, response) => {
        response.render('admin', {
            title: 'Admin Page'
        })
    },

    signup: async(req, res) => {
        const body = req.body
        const { username, email, password, confirm_password } = body

        if (password != confirm_password) {
            return res.json({
                Error: 0,
                message: "Password don't match"
            })
        }

        const salt = genSaltSync(10)
        const hashedPassword = await hashSync(password, salt)

        // console.log(hashedPassword)
        body.password = hashedPassword
            /// send user info to database
        let administrator = new Admin({
            username: username,
            email: email,
            password: hashedPassword
        })
        administrator.save()
            .then(res.json({ status: "OK" }))
            .catch(err => res.json(err))
    },

    login: async(req, res) => {
        const { username, password } = req.body
        if (!username || !password) {
            return res.json({
                message: "Please Provide an email and password"
            })
        }
        try {
            //
            await Admin.findOne({ username }).lean()
                .exec((err, results) => {
                    // console.log(results)
                    if (!compareSync(password, results.password)) {
                        res.json({
                            message: 'Incorrect Password!'
                        })
                    } else {
                        const id = results._id
                            // console.log("Login user ID "+id)
                        const token = jwt.sign({ id: id }, 'secretjn87y78h76uoihrQ32a32@ez4323tbjhbyugyu', {
                                expiresIn: '9d'
                            })
                            //   console.log("the token is " + token)

                        const cookieOptions = {
                            maxAge: new Date(
                                Date.now() + (9 * 24 * 60 * 60 * 1000)
                            ),
                            httpOnly: true,


                        }
                        res.cookie('adminSave', token, cookieOptions)
                        res.render('admin', {
                                title: 'Admin Page'
                            })
                            // return res.json('Welcome too admin page')
                    }
                })

        } catch (err) { console.log(err) }


    },

}