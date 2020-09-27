const {Markup} = require("telegraf")

function HomeMenu(ctx) {
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
            reply_markup: keyboard
        }
    );
}

exports.HomeMenu = HomeMenu