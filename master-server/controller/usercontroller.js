const { emit } = require('process');
const jwt = require('jsonwebtoken');
const User = require('../model/user')
const bcrypt = require('bcrypt')


const signup = async (req, res) => {
    try {
        console.log('hi from signup')
        console.log(req.body, "body from the server")
        const { name, email, password, confirmPassword, phoneNumber } = req.body
        if (password !== confirmPassword) {
            res.status(400).json({ message: "password does not match" });
            return

        }
        console.log(email, "email of user")


        const existingUser = await User.findOne({ email });
        if (existingUser) {

            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        console.log("password: ", password)
        console.log('hashedpassword:', hashedPassword)


        const userDetails = User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword
        });
        (await userDetails).save()
        console.log(userDetails)


        res.status(201).json({ message: "Your account has been successfully created" })


    } catch (error) {
        console.log(error, "error from signup")
    }
}


const login = async (req, res) => {
    try {
        console.log('hi from login server')
        console.log(req.body, "req  . body from server of login function")

        const { email, password } = req.body

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            console.log('no user found')
            res.status(400).json({ message: "User not found" });
            return;
        }


        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            const accessToken = jwt.sign({
                user: {
                    name: existingUser.name,
                    email: existingUser.email,
                    id: existingUser.id,
                    role: existingUser.role
                },

            }, process.env.ACCESS_TOKEN_SECERT,
                { expiresIn: '1h' })
            console.log(accessToken)
            const role = existingUser.role;
            console.log(role,"role from login server side")
            res.status(200).json({ accessToken, role, message: "Login successful" });
            console.log('login success')
            console.log('inside the if condition of token / password matched')
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.log(error, "error from login ")
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.params.id.replace(':', '');
        // console.log(userId, "user id from the request for getting the user profile");

        const user = await User.findById(userId);
        if (!user) {
            console.log('No user found with this id');
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editProfile = async (req, res) => {
    try {

         const { image, name } = req.body

        console.log(image, name, "consoleing the image and name edited by the user")


    } catch (error) {
        console.log(error, "error from edit profile")
    }
}

module.exports = { login, signup, editProfile, getProfile }