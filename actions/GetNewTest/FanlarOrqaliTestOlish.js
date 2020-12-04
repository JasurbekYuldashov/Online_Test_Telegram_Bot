const {findByUserIdOnViews, userViewSave} = require("../../models/userViewTest")
const {HomeMenu} = require("../HomeMenu")
const {orqaga, fanlar} = require("../../constants/subjects")
const {findBySubject} = require("../../models/documentsModel")

async function fanlarOrqaliTestOlish(fan, ctx) {
    if (fan === orqaga) {
        HomeMenu(ctx, true)
    } else {
        for (let i = 0; i < fanlar.length - 1; i++) {
            if (fan === fanlar[i]) {
                ctx.telegram.sendMessage(ctx.from.id, "Buyurtaming tez oradi jo'natiladi");
                let isSend = []
                let arrayViews = []
                let arrayDocuments = []
                await findByUserIdOnViews(ctx.from.id).then(async r => {
                    arrayViews[ctx.from.id] = [...r]
                });
                await findBySubject(fan).then(async r => {
                    arrayDocuments[ctx.from.id] = [...r]
                })
                isSend[ctx.from.id] = false;
                for (let k = 0; k < arrayDocuments[ctx.from.id].length; k++) {
                    if (arrayViews[ctx.from.id].length === 0 && !isSend[ctx.from.id]) {
                        await ctx.telegram.sendDocument(ctx.from.id,
                            arrayDocuments[ctx.from.id][0].fileId,
                            {caption: arrayDocuments[ctx.from.id][k].uniqueId});
                        isSend[ctx.from.id] = true
                        await userViewSave({documentId: arrayDocuments[ctx.from.id][0]._id, userId: ctx.from.id})
                        break;
                    }

                    // bu yerdagi o'zgaruvchi document jo'natilgani yoki yo'q shuni aniqlash uchun sanaydi
                    let isSendThisDocCount = [];
                    isSendThisDocCount[ctx.from.id] = 0
                    for (let j = 0; j < arrayViews[ctx.from.id].length; j++) {
                        if ((arrayViews[ctx.from.id][j] === undefined || arrayViews[ctx.from.id][j] === null) && !isSend[ctx.from.id]) {
                            await ctx.telegram.sendDocument(ctx.from.id,
                                arrayDocuments[ctx.from.id][k].fileId,
                                {caption: arrayDocuments[ctx.from.id][k].uniqueId});
                            await userViewSave({
                                documentId: arrayDocuments[ctx.from.id][k]._id,
                                userId: ctx.from.id
                            });
                            isSend[ctx.from.id] = true
                            break;
                        } else if (arrayViews[ctx.from.id][j].documentId == arrayDocuments[ctx.from.id][k]._id && !isSend[ctx.from.id]) {
                            isSendThisDocCount[ctx.from.id] = isSendThisDocCount[ctx.from.id] + 1;
                        }
                    }

                    if ( isSendThisDocCount[ctx.from.id] == 0) {
                        isSend[ctx.from.id] = true
                        await userViewSave({
                            documentId: arrayDocuments[ctx.from.id][k]._id,
                            userId: ctx.from.id
                        });
                        if (arrayDocuments[ctx.from.id][k]){
                            await ctx.telegram.sendDocument(ctx.from.id, arrayDocuments[ctx.from.id][k].fileId, {caption: arrayDocuments[ctx.from.id][k].uniqueId}).catch((r)=>{
                                console.log(r)
                            });
                        }
                        break;
                    } else {
                        isSendThisDocCount = 0;
                    }
                }

                HomeMenu(ctx, false);
                break;
            }
        }
    }
}

exports.fanlarOrqaliTestOlish = fanlarOrqaliTestOlish;