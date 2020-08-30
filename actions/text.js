const {bot} = require("../core/bot")

bot.on("text",(ctx => {
    ctx.replyWithHTML("<b>Hello</b>")
}))

