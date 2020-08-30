const {bot} = require("../core/bot")

bot.start(ctx => {
    ctx.reply(`Assalomu alaykum.\nXush kelibsiz ${ctx.from.first_name}
        
    `).then(r=>console.log(r)).catch(error=>{console.log(error)})
})