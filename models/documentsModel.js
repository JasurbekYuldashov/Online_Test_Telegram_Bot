const {mongoose} = require("./userModel")

const documentSchema = new mongoose.Schema({
    fileId: {
        type: String
    },
    uniqueId: {
        type: String
    },
    answers: {
        type: String,
        lowercase: true,
        maxlength: 30
    },
    userId: {
        type: Number
    },
    subject: {
        type: String,
        lowercase: true,
        maxlength: 20
    },
    countTest:Number
})

const Answer = new mongoose.model("document", documentSchema);

async function save(model) {
    const newAnswer = await Answer.find({uniqueId: model.uniqueId})
    if (newAnswer.length === 0) {
        const doc = Answer(model);
        const res = await doc.save()
        return true;
    } else {
        console.log("document mavjud")
        return false;
    }
}

async function findById(id) {
    const newAnswer = await Answer.find({uniqueId: id})
    return newAnswer.length === 0 ? true : false;
}

async function getById(id) {
    const newAnswer = await Answer.findOne({_id: id})
    return newAnswer
}

async function getByUniqueId(id) {
    const newAnswer = await Answer.find({uniqueId: id})
    return newAnswer.length > 0 ? newAnswer[0] : null
}

async function getLastUniqueId() {
    const newAnswer = await Answer.find()
    return newAnswer.length > 0 ? newAnswer[newAnswer.length - 1].uniqueId : 0
}

async function findBySubject(subject) {
    mongoose.model('document').schema.add({countTest: Number});
    const newAnswer = await Answer.find({subject: subject})
    return newAnswer

}

async function findBySubject(fan) {
    const newAnswer = await Answer.find({subject: fan})
    return newAnswer[0] !== undefined ? newAnswer : []
}

exports.save = save;
exports.findByUniqueId = findById;
exports.getLastUniqueId = getLastUniqueId;
exports.findBySubject = findBySubject;
exports.getByUniqueIdOnDocuments = getByUniqueId;
exports.getByIdOnDocuments = getById;
