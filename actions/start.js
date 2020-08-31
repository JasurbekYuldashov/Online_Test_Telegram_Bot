const {bot} = require("../core/bot");
const {Markup} = require("telegraf");
const {save, findByUserId} = require("../models/userModel")

bot.start(ctx => {
    if (findByUserId(ctx.chat)===true){
        // const keyborad = Markup.keyboard([
        //     Markup.callbackButton("salom","salom")
        // ])
        // ctx.telegram.sendMessage(
        //     ctx.from.id,
        //     "salom",
        //     {
        //         reply_markup:keyborad
        //     }
        // )
        console.log("admin")
    } else {
        console.log("amin emas")
    }
})