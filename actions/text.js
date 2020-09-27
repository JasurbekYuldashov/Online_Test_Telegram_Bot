const {Markup} = require("telegraf")
const {bot} = require("../core/bot")
const {findByUserId} = require("../models/userModel")
const {findById} = require("../models/userViewTest")
const {YangiTestOlish} = require("./TestOlish");
const {TestniTekshirish} = require("./TestniTekshirish")
const {YangiTest} = require("./YangiTestYaratish")
const {HisobniTekshirish} = require("./HisobniTekshirish")
const {HomeMenu} = require("./HomeMenu")

const orqaga = "◀ Orqaga qaytish";
var TestniTekshirishBosilganmi = false;
var id = 0;

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

function fanlarOrqaliTestOlish(fan, ctx) {
    if (fan === orqaga) {
        HomeMenu(ctx)
    } else {
        for (let i = 0; i < fanlar.length - 1; i++) {
            if (fan === fanlar[i]) {
                ctx.telegram.sendMessage(ctx.from.id, "Buyurtaming tez oradi jo'natiladi");
                findById(ctx.from.id).then(r => {
                    console.log(r)
                })
                HomeMenu(ctx);
            }
            ;
        }
    }
}

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
}))

