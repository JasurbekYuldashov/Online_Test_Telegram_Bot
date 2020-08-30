const {bot} = require("../core/bot")

bot.start(ctx => {
    ctx.reply(`Assalomu alaykum.\nXush kelibsiz ${ctx.from.first_name}
    `).then(r=>console.log(r)).catch(error=>{console.log(error)})
})

bot.on("new_chat_members",(ctx => {
    console.log(ctx.chat.id)
}))