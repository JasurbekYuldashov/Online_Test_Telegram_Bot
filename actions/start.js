const { bot } = require("../core/bot");
const { Markup } = require("telegraf");
const { findByUserId, onStartPayload } = require("../models/userModel");
const { buttons } = require("../constants/menuButtons");

// bot.action("men_kannalga_azo_boldim", async ctx => {
//     findByUserId(ctx.from).then(r => {
//         ctx.telegram.getChatMember(process.env.MY_CHANNEL_LINK, ctx.from.id).then(r => {
//             if (r.status === "member" || r.status === "creator" || r.status === "administrator") {
//                 let keyboard = Markup.keyboard([
//                     Markup.button(buttons.pulIshlash),

//                     Markup.button(buttons.testOlish),
//                     Markup.button(buttons.testniTekshirish),
//                     Markup.button(buttons.yangiTestYaratish),
//                     Markup.button(buttons.hisobniTekshirish),
//                 ],{columns:2});
//                 if (ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID2 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID3 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID4) {
//                     keyboard = Markup.keyboard([
//                         Markup.button(buttons.pulIshlash),
//                         Markup.button(buttons.testOlish),
//                         Markup.button(buttons.testniTekshirish),
//                         Markup.button(buttons.yangiTestYaratish),
//                         Markup.button(buttons.hisobniTekshirish),
//                         Markup.button(buttons.botHaqida),
//                     ],{columns:2})
//                 }
//                 ctx.telegram.sendMessage(
//                     ctx.from.id,
//                     "Kerakli buyruqni tanlang!",
//                     {
//                         reply_markup: keyboard
//                     }
//                 );
//             } else {
//                 let keyboard = Markup.inlineKeyboard([
//                     Markup.urlButton("Kanalga Kirish", `https://t.me/${process.env.MY_CHANNEL_LINK_NOT}`),
//                     Markup.callbackButton("✅ Tekshirish", "men_kannalga_azo_boldim")
//                 ]);
//                 ctx.telegram.sendMessage(ctx.from.id, "Kanalga a'zo bo'ling!!!", { reply_markup: keyboard })
//             }
//         })
//     })
// })

bot.start(ctx => {
    console.warn("asadasd")
    if (ctx.startPayload) {
        onStartPayload(ctx.startPayload, ctx.from);
    }
    findByUserId(ctx.from).then(r => {
        ctx.telegram.getChatMember(process.env.MY_CHANNEL_LINK, ctx.from.id).then(r => {
            if (r.status === "member" || r.status === "creator" || r.status === "administrator") {
                let keyboard = Markup.keyboard([
                    Markup.button(buttons.testOlish),
                    Markup.button(buttons.testniTekshirish),
                    Markup.button(buttons.yangiTestYaratish),
                    Markup.button(buttons.hisobniTekshirish),
                ], { columns: 2 });
                if (ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID2 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID3 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID4) {
                    keyboard = Markup.keyboard([
                        Markup.button(buttons.testOlish),
                        Markup.button(buttons.testniTekshirish),
                        Markup.button(buttons.yangiTestYaratish),
                        Markup.button(buttons.hisobniTekshirish),
                        Markup.button(buttons.botHaqida),
                    ], { columns: 2 })
                }
                ctx.telegram.sendMessage(
                    ctx.from.id,
                    "Kerakli buyruqni tanlang!",
                    {
                        reply_markup: keyboard
                    }
                );
            } else {
                let keyboard = Markup.inlineKeyboard([
                    Markup.urlButton("Kanalga Kirish", `https://t.me/${process.env.MY_CHANNEL_LINK_NOT}`),
                    Markup.callbackButton("✅ Tekshirish", "men_kannalga_azo_boldim")
                ]);
                ctx.telegram.sendMessage(ctx.from.id, "Kanalga a'zo bo'ling!!!", { reply_markup: keyboard })
            }
        })
    }).catch(e => {
        console.warn(e)
    })
});