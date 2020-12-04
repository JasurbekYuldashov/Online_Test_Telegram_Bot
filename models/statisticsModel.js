const {mongoose, cashBackPlus} = require("./userModel");
const {getByIdOnDocuments} = require("./documentsModel");

const staticts = new mongoose.Schema({
	documentId: String,
	userId: Number,
	first_name:String,
	userCorrectAnswers: Number
});

const Static = new mongoose.model("staticts", staticts);

async function save(model) {
	const allModel = await Static.find({documentId: model.documentId, userId: model.userId});
	if (allModel.length > 0) {
		if (allModel[0].userCorrectAnswers < model.userCorrectAnswers) {
			const saveModel = await Static(model);
			await saveModel.save();
		}
	}
}

async function getForPostTelegraph(userId, docId) {
	let returnType = {
		resultCount: 0,
		myResult: 0,
		allResult: []
	}
	let allModel = await Static.find({documentId: docId}).sort("userCorrectAnswers");
	allModel = [...allModel].reverse()
	returnType.allResult = [...allModel]
	returnType.resultCount = allModel.length
	for (let i = 0; i < allModel.length; i++) {
		if (userId === allModel[i].userId) {
			returnType.myResult = i;
		}
	}
	return returnType
}

async function getOrSaveStatistic(userId,first_name, docId, count) {
	mongoose.model('staticts').schema.add({first_name: String});
	let allModel = await Static.findOne({userId: userId, documentId: docId});
	if (allModel) {
		if (allModel.userCorrectAnswers <= count) {
			allModel.userCorrectAnswers = count;
			allModel.first_name = first_name;
			await allModel.save();
		}
	} else {
		const saveModel = await Static({userId: userId, documentId: docId,first_name:first_name, userCorrectAnswers: count});
		let docCreateUserId = null;
		await getByIdOnDocuments(docId).then(r => {
			docCreateUserId = r.userId
		});
		cashBackPlus(docCreateUserId);
		await saveModel.save();
	}
	allModel = await Static.findOne({userId: userId, documentId: docId});
	console.log(allModel)
	return allModel ? allModel : null
}

async function getByDocumentIdOnStatics(docId) {
	const allModel = await Static.find({documentId: docId});
	return allModel.length > 0 ? allModel[0] : null
}

exports.saveStatistics = save
exports.getByDocumentIdOnStatics = getByDocumentIdOnStatics
exports.getOrSaveStatistic = getOrSaveStatistic
exports.getForPostTelegraph = getForPostTelegraph