import { UserServices } from "./user.service"

const signup = async(req, res)=> {
    try {
        console.log(req.body)
        const user = UserServices.signupIntoDB(req.body)
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

export const UserControllers = {
    signup
}