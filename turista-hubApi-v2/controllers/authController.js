import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'





//user registration
export const register = async (req, res) => {

    try {


        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email is already in use',
            });
        }

        //hashing password 
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)





        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            role: req.body.role,
            photo: req.body.photo
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: 'Successfuly created',

        })


    }

    catch (err) {
        res.status(500).json({ success: false, message: 'Failed  , Try again' })
    }
}



//user login
export const login = async (req, res) => {
    const email = req.body.email

    try {

        const user = await User.findOne({ email })


        //if user does not exist
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not ffound',

            })

        }

        // if user is exist then checkeing the passsword  or comparing the password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)



        //if password is incorrect 
        if (!checkCorrectPassword) {
            return res.status(401).json({
                success: false,
                message: 'incorrect email or password ',

            })

        }

        const { password, role, ...rest } = user._doc


        //create jwt token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' })



        res.cookie('accessToken', token, {
            httpOnly: true,
            // expires: token.expiresIn,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'Strict',

        })
            .status(200).json({
                token,
                data: { ...rest, role }
            })
    }

    catch (err) {
        res.status(500).json({ success: false, message: 'Failled to login' })


    }
}

