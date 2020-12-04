const mongoose = require("mongoose");

let isConnect = false

mongoose.connect(process.env.MONGODB_URL).then(async r => {
    console.log("ulandi")
    isConnect = true
}).catch(e => {
    console.log("error")
})

const userSchema = new mongoose.Schema({
    userId: Number,
    cashback: Number,
    activeDate: Date,
    first_name: String
});

const User = new mongoose.model("User", userSchema);

async function save(model) {
    console.log(model, "asdasdas")
    if (isConnect) {
        const user = new User(model)
        const res = await user.save()
    }
}

async function findByUserId(findUser) {
    if (isConnect) {

        const user = await User.find({ userId: findUser.id })
        if (user.length === 0) {
            save({
                userId: findUser.id,
                cashback: 0,
                activeDate: new Date()
            });
            return false
        } else {
            return user[0].is_admin == true ? true : false;
        }
    }
    return false;
}

async function getByUserId(userId) {
    if (isConnect) {
        const user = await User.findOne({ userId: userId })
        return user
    }
}

async function cashBackPlus(userId) {
    const user = await User.findOne({ userId: userId })
    user.cashback += 50
    user.save();
}

async function howMuchMyMoney(userId) {
    const user = await User.findOne({ userId: userId })
    return user ? user.cashback : 0
}

async function minusUserChashBack(userId, sum) {
    const user = await User.findOne({ userId: userId })
    user.cashback -= sum;
    user.save();
}

async function userOnActive(from) {
    if (isConnect) {
        // console.log(User.find().schema.add({first_name:String}))
        let user = await User.findOne({ userId: from.id });
        console.log(user)
        if (user !== null) {
            user.activeDate = new Date();
            user.first_name = from.first_name;
            user.save();
        }
        // console.log(user)
    }
}

async function getUsersCountOnDb() {
    const user = await User.find()
    let OneWeekCount = 0;
    let TwoWeekCount = 0;
    let OneMonth = 0;
    let Yearly = 0;
    let BalanceAllUsers = 0;
    if (user.length) {
        for (let i = 0; i < user.length; i++) {
            BalanceAllUsers += user[i].cashback;
            let dateActiveCount = (new Date() - user[i].activeDate) / (1000 * 60 * 60 * 24);
            if (dateActiveCount > 0 && dateActiveCount <= 365) {
                Yearly++
                if (dateActiveCount > 0 && dateActiveCount <= 7) {
                    OneWeekCount++
                }
                if (dateActiveCount > 0 && dateActiveCount <= 14) {
                    TwoWeekCount++
                }
                if (dateActiveCount > 0 && dateActiveCount <= 30) {
                    OneMonth++
                }
            }
        }
    }
    return {
        weekly: OneWeekCount,
        twoWeekly: TwoWeekCount,
        monthly: OneMonth,
        yearly: Yearly,
        BalanceAllUsers: BalanceAllUsers
    }
}

async function updateUserAdmin(userId) {
    const findUser = await User.find({ userId: userId })
    if (findUser[0].length !== 0) {
        findUser[0].is_admin = true;
        findUser[0].save()
    } else {
        return;
    }
}

async function onStartPayload(startPayload, from) {
    const findUser = await User.findOne({ userId: from.id })
    console.log(findUser, "saasdasdasd")
    if (!findUser) {
        let findUser1 = await User.findOne({ userId: parseInt(startPayload) })
        if (findUser1) {
            findUser1.cashback += 50;
            findUser1.save();
        }
    } else {
        console.log(startPayload, from)
    }
}

async function getAllUsersUserId() {
    let usersId = []
    const findUser = await User.find()
    for (let i = 0; i < findUser.length;i++){
        usersId = [...usersId,findUser[i].userId]
    }

    return usersId
}

exports.save = save;
exports.updateAdmin = updateUserAdmin;
exports.findByUserId = findByUserId;
exports.mongoose = mongoose;
exports.cashBackPlus = cashBackPlus;
exports.howMuchMyMoney = howMuchMyMoney;
exports.getByUserIdOnUserModel = getByUserId;
exports.minusUserChashBack = minusUserChashBack;
exports.userOnActive = userOnActive;
exports.getUsersCountOnDb = getUsersCountOnDb;
exports.onStartPayload = onStartPayload;
exports.getAllUsersUserId = getAllUsersUserId;
