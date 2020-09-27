const {mongoose} = require("./userModel")

const documentSchema = new mongoose.Schema({
    fileId: {
        type:String,
        required: true
    },
    uniqueId: {
        type:String,
        required: true
    },
    answers: {
        type: String,
        lowercase: true,
        required: true,
        maxlength: 30
    },
    subject:{
        type:String,
        lowercase:true,
        required:true,
        maxlength: 20
    }
})

const Answer = new mongoose.model("document", documentSchema);

async function save(model) {
    const newAnswer = await Answer.find({uniqueId: model.uniqueId})
    if (newAnswer.length === 0) {
        const doc = Answer(model);
        const res = await doc.save()
        console.log(model)
        return true;
    } else {
        console.log("document mavjud")
        return false;
    }
}

async function findById(id){
    const newAnswer = await Answer.find({uniqueId: id})
    return newAnswer[0]!==undefined?newAnswer:[]
}

async function findBySubject(fan){
    const newAnswer = await Answer.find({subject: fan})
    return newAnswer[0]!==undefined?newAnswer:[]
}

exports.save = save
