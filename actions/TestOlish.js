const {Markup} = require("telegraf")
const orqaga = "◀ Orqaga qaytish";

const fanlar = [
    "Matematika",
    "Fizika",
    "Ingiliz tili",
    "Biologiya",
    "Kimyo",
    "Tarix",
    "Geografiya",
    "Nemis tili",
    "Huquq",
    "Ona tili",
    orqaga
];

function YangiTestOlish(ctx) {
    let arraySubjects = fanlar.map(fan => Markup.button(fan))
    const keyboard = Markup.keyboard([...arraySubjects]);
    ctx.telegram.sendMessage(ctx.from.id, "Kerakli fanni tanlash", {reply_markup: keyboard});
}

exports.YangiTestOlish = YangiTestOlish