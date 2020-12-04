const {Markup} = require("telegraf")
const {orqaga, fanlar} = require("../../constants/subjects");
const {save} = require("../../models/documentsModel")

function YangiTest(
    ctx,
    YangiTestYaratishBosilganmi,
    YangiTestUniqId,
    YangiTestFileId,
    YangiTestJavoblari,
    YangiTestniUserIdsi,
    YangiTestFani) {
    if (
        YangiTestYaratishBosilganmi
        && YangiTestUniqId !== 0
        && YangiTestFileId !== 0
        && YangiTestJavoblari !== ""
        && YangiTestJavoblari.length === 30
        && YangiTestniUserIdsi!== 0
        && YangiTestFani !== ""
    ) {
        console.log(5);
        save({
            fileId:YangiTestFileId,
            uniqueId:YangiTestUniqId,
            answers:YangiTestJavoblari,
            userId:YangiTestniUserIdsi,
            subject:YangiTestFani
        }).then(r=>{
            ctx.telegram.sendMessage(ctx.from.id,"Fayl tagi(captini)dagi unik id bilan test tekshiriladi!!!");
            ctx.telegram.sendDocument(ctx.from.id,YangiTestFileId,{caption:YangiTestUniqId});
        }).catch(reason => {
            ctx.telegram.sendMessage("Xatolik yuz berdi qaytadan urinib ko'ring!")
        })
    } else if (
        YangiTestYaratishBosilganmi
        && YangiTestUniqId !== 0
        && YangiTestFileId !== 0
        && YangiTestJavoblari === ""
        && YangiTestJavoblari.length === 0
        && YangiTestniUserIdsi !== 0
        && YangiTestFani !== ""
    ) {
        console.log(4)
        ctx.telegram.sendMessage(ctx.from.id,"Test javoblarini kiriting 30 talik xarf bo'lsin \n Masalan: abcdabcdabcdabcdabcdabcdab")
    } else if (
        YangiTestYaratishBosilganmi
        && YangiTestUniqId !== 0
        && YangiTestFileId !== 0
        && YangiTestJavoblari === ""
        && YangiTestJavoblari.length === 0
        && YangiTestniUserIdsi !== 0
        && YangiTestFani === ""
    ) {
        console.log(2)
        let arraySubjects = fanlar.map(fan => Markup.button(fan))
        const keyboard = Markup.keyboard([...arraySubjects]);
        ctx.telegram.sendMessage(ctx.from.id,"Qaysi fan bo'yicha test yaratyabsiz!!",{reply_markup:keyboard})
    } else if (
        YangiTestYaratishBosilganmi
        && YangiTestUniqId === 0
        && YangiTestFileId === 0
        && YangiTestJavoblari === ""
        && YangiTestJavoblari.length === 0
        && YangiTestniUserIdsi === 0
        && YangiTestFani === ""
    ) {
        console.log(1);
        ctx.telegram.sendMessage(ctx.from.id,"Yangi test fayilini jo'nating");
    }
}

exports.YangiTest = YangiTest