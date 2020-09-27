const salom = (ctx) => {
    ctx.telegram.sendMessage(ctx.from.id, "salom")
}

module.exports.salom = salom