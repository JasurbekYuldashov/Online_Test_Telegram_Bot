function YangiTestOlish(ctx) {
    let arraySubjects = fanlar.map(fan => Markup.button(fan))
    console.log(a)
    const keyboard = Markup.keyboard([...arraySubjects]);
    ctx.telegram.sendMessage(ctx.from.id, "Kerakli fanni tanlash", {reply_markup: keyboard});
}

exports.YangiTestOlish = YangiTestOlish