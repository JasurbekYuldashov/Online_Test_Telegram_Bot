const {bot} = require("../core/bot");
const {Markup} = require("telegraf");
const {save, findByUserId} = require("../models/userModel")

bot.start(ctx => {
    findByUserId(ctx.from).then(r=>{
        if (r==true){
            console.log("admin")
            const keyboard = Markup.keyboard([
                Markup.button("Yangi test yaratish"),
                Markup.button("Tahrirlash"),
            ])
            ctx.telegram.sendMessage(
                ctx.from.id,
                "Kerakli buyruqni tanlang!",
                {
                    reply_markup:keyboard
                }

            )
        } else {
            console.log("admin emas")
            const keyboard = Markup.keyboard([
                Markup.button("Natijani bilish!")
            ])
            ctx.telegram.sendMessage(
                ctx.from.id,
                "Kerakli buyruqni tanlang!",
                {
                    reply_markup:keyboard
                }

            )
        }
    })
})