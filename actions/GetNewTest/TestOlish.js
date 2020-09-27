const {Markup} = require("telegraf")
const {orqaga, fanlar} = require("../../constants/subjects")

function YangiTestOlish(ctx) {
    let arraySubjects = fanlar.map(fan => Markup.button(fan))
    const keyboard = Markup.keyboard([...arraySubjects]);
    ctx.telegram.sendMessage(ctx.from.id, "Kerakli fanni tanlash", {reply_markup: keyboard});
}

exports.YangiTestOlish = YangiTestOlish;