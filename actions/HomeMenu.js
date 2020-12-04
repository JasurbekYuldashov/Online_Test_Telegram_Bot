const {buttons} =require("../constants/menuButtons");

const {Markup} = require("telegraf")

function HomeMenu(ctx,bool) {
    bool = bool!==undefined && bool!==null?bool:false
    let keyboard = Markup.keyboard([
        Markup.button(buttons.pulIshlash),
        Markup.button(buttons.testOlish),
        Markup.button(buttons.testniTekshirish),
        Markup.button(buttons.yangiTestYaratish),
        Markup.button(buttons.hisobniTekshirish),
    ],{columns:2});
    if (ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID ||ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID2 ||ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID3 ||ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID4) {
        keyboard = Markup.keyboard([
            Markup.button(buttons.pulIshlash),
            Markup.button(buttons.testOlish),
            Markup.button(buttons.testniTekshirish),
            Markup.button(buttons.yangiTestYaratish),
            Markup.button(buttons.hisobniTekshirish),
            Markup.button(buttons.botHaqida),
        ],{columns:2})
    }
    
    ctx.telegram.sendMessage(
        ctx.from.id,
        bool?"Kerakli buyruqni tanlang!":"Buyruqlarni Tanlashingiz mumkin!!!",
        {
            reply_markup: keyboard
        }
    );
}

exports.HomeMenu = HomeMenu