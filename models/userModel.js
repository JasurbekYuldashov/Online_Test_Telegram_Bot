const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://jjkyuldashov:jasurbek123456@jasurbek.j2dlm.mongodb.net/<dbname>?retryWrites=true&w=majority").then(r => {
    console.log("ulandi")
}).catch(e => {
    console.log("error")
})

const userSchema = new mongoose.Schema({
    userId: Number,
    is_admin: Boolean,
    reads: Array
})

const User = new mongoose.model("User", userSchema)

async function save(model) {
    const user = new User(model)
    const res = await user.save()
    console.log(res)
}

async function findByUserId(findUser) {
    const user = await User.find({userId: findUser.id})
    console.log(user)
    if (user.length === 0) {
        save({
            userId: findUser.id,
            is_admin: false,
            reads: []
        })
        return false
    } else {
        if (user[0].is_admin === true) {
            return true
        } else return false
    }
}

async function updateUserAdmin(userId) {
    const findUser = await User.find({userId: userId})
    console.log(findUser)
    if (findUser[0].length !== 0) {
        findUser[0].is_admin = true;
        findUser[0].save()
    } else {
        return;
    }
}

exports.save = save
exports.updateAdmin = updateUserAdmin
exports.findByUserId = findByUserId
exports.mongoose = mongoose