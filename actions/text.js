const {bot} = require("../core/bot")
const {updateAdmin} = require("../models/userModel")

const password = process.env.BOT_USER_PASSWORD

bot.on("message",(ctx => {
    console.log(ctx.message)
    ctx.replyWithHTML("<b>Hello</b>")
    ctx.telegram.sendDocument(
        ctx.from.id,
        "BQACAgIAAxkBAAICxV9L3xZHTYV7nFwVFoQ1ie7tQL2jAAJmBwACJ8FgSidEIvOWsCJRGwQ"
    )
    if (password==ctx.update.message.text){
        updateAdmin(ctx.chat.id)
    }
}))

