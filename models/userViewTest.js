const {mongoose} = require("./userModel")

const viewTestSchema = new mongoose.Schema({
    documentId: String,
    userId: Number,
    isChecked:false,
    correctAnswersCount:0
});

const Views = new mongoose.model("userViewTest", viewTestSchema);

async function save(model) {
    const view = new Views(model)
    await view.save();
    return true;
}

async function findById(userId) {
    const views = Views.find({userId: userId});
    return views;
}

async function findByUserIdAndDocumentId(usersaId,docId){
    const views = Views.find();
    return views.length>0?views[0]:null;
}


exports.userViewSave = save;
exports.findByUserIdOnViews = findById;
exports.findByUserIdAndDocumentIdOnViews = findByUserIdAndDocumentId;