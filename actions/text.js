const {bot} = require("../core/bot")
const {findByUserId} = require("../models/userModel")
const {YangiTestOlish} = require("./GetNewTest/TestOlish");
const {TestniTekshirish} = require("./TestniTekshirish")
const {YangiTest} = require("./YangiTestYaratish")
const {HisobniTekshirish} = require("./HisobniTekshirish")
const {fanlarOrqaliTestOlish} = require("./GetNewTest/FanlarOrqaliTestOlish");
const {orqaga, fanlar} = require("../constants/subjects")


bot.on("message", (ctx => {
    findByUserId(ctx.from).then(r => {
        if (ctx.updateType === "message") {
            if (ctx.update.message.text === "📁 Test olish") YangiTestOlish(ctx)
            if (ctx.update.message.text === "📑 Testni tekshirish") TestniTekshirish(ctx);
            if (ctx.update.message.text === "📫 Yangi test yaratish") YangiTest(ctx);
            if (ctx.update.message.text === "💰 Hisobni tekshirish") HisobniTekshirish(ctx)
            for (let i = 0; i < fanlar.length; i++) {
                if (fanlar[i] === ctx.update.message.text) {
                    fanlarOrqaliTestOlish(fanlar[i], ctx);
                    break;
                }
            }
        }
    })
}));

