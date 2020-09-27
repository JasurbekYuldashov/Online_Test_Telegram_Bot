const {mongoose} = require("./userModel")

const viewTestSchema = new mongoose.Schema({
    documentId:Number,
    userId:Number
})

const Views = new mongoose.model("userViewTest",viewTestSchema);

async function save(model) {
    const view = Views(model)
    view.save();
    return true;
}

async function findById(userId) {
    const views = Views.find({userId:userId});
    return views;
}


exports.save=save;
exports.findById=findById;