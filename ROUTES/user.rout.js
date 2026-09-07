import userModel from '../server.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const GetAllUsers = async(req, res) => {
    let getall = await userModel.find()
    res.json(getall)
}

const GetUser = async(req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.json("enter your data first")
    let getuser = await userModel.findOne({ email })
    if (!getuser) return res.json("user is not exist")
    let compare = await bcrypt.compare(password, getuser.password)

    if (compare) return res.json(getuser)
    else { return res.json("something went wrong") }
}

const AddNew = async(req, res) => {
    let { name, email, password } = req.body
    if (!name || !email || !password) return res.json("enter you data first")
    let checkuser = await userModel.findOne({ email })
    if (checkuser) return res.json("user is already exist")

    let allusers = await userModel.find()
    for (let u of allusers) {

        let samePassword = await bcrypt.compare(password, u.password)
        if (samePassword) return res.json("this password has been taken")
    }
    let hashedpassword = await bcrypt.hashSync(password, 10)

    let token = jwt.sign({ email, password }, process.env.JWT_SECRET)

    let newuser = await userModel.create({
        name,
        email,
        password: hashedpassword,
        token
    })
    return res.json(newuser)
}

const DeleteUser = async(req, res) => {
    let { email, password } = req.body
    if (!password || !email) return res.json("enter your data first")
    let existuser = await userModel.findOne({ email })
    if (!existuser) {
        res.json("email is not exist")
    }
    let compare = await bcrypt.compare(password, existuser.password)
    if (compare) {
        let deleteuser = await userModel.deleteMany({ email })
        return res.json("user is delete")
    } else {
        return res.json("something went wrong please try again")
    }

}

const ChangeInfo = async(req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.json("enter your data first")
    let existuser = await userModel.find({ email })
    if (!existuser) {
        return res.json("email is not exist")
    }
    let changeuser = await userModel.findOneAndUpdate({ email }, { password })
    return res.json(existuser)
}


export { GetAllUsers, AddNew, ChangeInfo, DeleteUser, GetUser }