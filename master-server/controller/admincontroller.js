const user = require('../model/user')
const bcrypt = require('bcrypt')


const getUser = async (req, res) => {
    try {
        console.log('hi from admin panel server function')
        const users = await user.find({ role: 'user' })

        console.log(users, "consoling the res of admin panel")
        res.status(200).json({ users })

    } catch (error) {
        console.log(error, "error from admin panel")
    }
}



const deleteUser = async (req, res) => {
    try {

        console.log('hi from deleting the user from admin panel -- server side ')
        const id = req.params.id.replace(':', '');
        console.log(id, "id from delete user")
        await user.findByIdAndDelete(id)
        res.status(200).json({ message: "User successfully deleted" })

    } catch (error) {
        console.log(error, "error from deleting an user")
    }
}

const addUser = async (req, res) => {
    try {
        console.log('hi from add user function from server')
        console.log(req.body, "body from the server")
        const { name, email, password, confirmPassword, phoneNumber } = req.body
        const existingUser = await user.findOne({ email });
        if (existingUser) {

            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)


        console.log("password: ", password)
        console.log('hashedpassword:', hashedPassword)

        const userDetails = user.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword
        });
        (await userDetails).save()
        console.log(userDetails)


        res.status(201).json({ message: "New user created successfully " })


    } catch (error) {
        console.log(error, "error from adding user ")
    }
}
const editUser = async (req, res) => {
    try {
        const userId = req.params.id.replace(':', '');
        const userData = req.body;
        const existingUser = await user.findOne({ email: userData.email, _id: { $ne: userId } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const updatedUser = await user.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            console.log('inside the if condition of no updateed user')
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(updatedUser, "consoling the updated user before sending to the client side")

        res.status(200).json({ updatedUser, message: 'Edited user successfully' });
    } catch (error) {
        console.log(error, "error from editing the user")
    }
}

module.exports = { getUser, deleteUser, addUser, editUser }