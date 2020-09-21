const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://jjkyuldashov:jasurbek123456@jasurbek.j2dlm.mongodb.net/<dbname>?retryWrites=true&w=majority").then(r => {
    console.log("ulandi")
}).catch(e => {
    console.log("error")
})

const userSchema = new mongoose.Schema({
    userId: Number,
    is_admin: Boolean,
    reads: Array,
    cashBack:Number,
    first_name: String,
    last_name: String,
    username: String
})

const User = new mongoose.model("User", userSchema);

async function save(model) {
    const user = new User(model);
    const res = await user.save();
}

async function findByUserId(findUser) {
    const user = await User.find({userId: findUser.id});
    if (user.length === 0) {
        save({
            userId: findUser.id,
            is_admin: false,
            reads: []
        })
        return false
    } else {
        return user[0].is_admin == true ? true : false;
    }
    return false;
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
