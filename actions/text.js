const {bot} = require("../core/bot")
const {updateAdmin, findByUserId} = require("../models/userModel")
const {save} = require("../models/documentsModel")

const password = process.env.BOT_USER_PASSWORD
var faylniJonatish = false;
var natijaniBilish = false;
var docId = null;

bot.on("message", (ctx => {
    console.log(ctx.update)
    findByUserId(ctx.from).then(r => {
        if (r == true) {
            if (ctx.update.message.text !== undefined && "Yangi test yaratish") {
                ctx.reply("Faylni jo'nating")
                faylniJonatish = true
            }
            if (faylniJonatish && ctx.update.message.document !== undefined && ctx.update.message.caption !== undefined) {
                console.log(ctx.update)
                faylniJonatish = false;
                var capation = ctx.update.message.caption;
                var doc = ctx.update.message.document;
                var probel = capation.indexOf(" ");
                var indexDoc = capation.slice(0,probel)
                var answers = capation.slice(probel+1,capation.length);
                save({
                    fileId:doc.file_unique_id,
                    uniqueId:indexDoc,
                    answers:answers
                }).then(r=>{
                    ctx.reply("saqladim!")
                });
            } else {
                console.log(faylniJonatish)
            }
        } else {
            if (ctx.update.message.text !== undefined && "Natijani bilish!") {
                ctx.reply("Document 'Id'sini jo'nating ")
                natijaniBilish=true
            }
            if (natijaniBilish && ctx.update.message.text !== undefined) {
                var id = ctx.update.message.text

            } else {
                console.log(natijaniBilish)
            }
        }
    })
}))

