const {bot} = require("../core/bot");
const {Markup} = require("telegraf");
const {save, findByUserId} = require("../models/userModel")

bot.start(ctx => {
    findByUserId(ctx.from).then(r=>{
        const keyboard = Markup.keyboard([
            Markup.button("📁 Test olish"),
            Markup.button("📑 Testni tekshirish"),
            Markup.button("📫 Yangi test yaratish"),
            Markup.button("💰 Hisobni tekshirish"),
        ]);
        ctx.telegram.sendMessage(
            ctx.from.id,
            "Kerakli buyruqni tanlang!",
            {
                reply_markup:keyboard
            }
        );
        // if (r==true){
        //     console.log("admin")
        //
        // } else {
        //     console.log("admin emas")
        //     const keyboard = Markup.keyboard([
        //         Markup.button("Natijani bilish!")
        //     ])
        //     ctx.telegram.sendMessage(
        //         ctx.from.id,
        //         "Kerakli buyruqni tanlang!",
        //         {
        //             reply_markup:keyboard
        //         }
        //
        //     )
        // }
    })
});