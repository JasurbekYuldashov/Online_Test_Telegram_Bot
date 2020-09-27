const {Markup} = require("telegraf")
const {bot} = require("../core/bot")
const {findByUserId} = require("../models/userModel")
const {findById} = require("../models/userViewTest")
// const s = require("TestOlish")

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

function YangiTestOlish(ctx) {
    let a = fanlar.map(fan => Markup.button(fan))
    console.log(a)
    const keyboard = Markup.keyboard([...a]);
    ctx.telegram.sendMessage(ctx.from.id, "Kerakli fanni tanlash", {reply_markup: keyboard});
}

function TestniTekshirish(ctx) {
    if (TestniTekshirishBosilganmi){
        ctx.telegram.sendMessage(ctx.from.id,"Javoblarni kiriting")
        ctx.telegram.sendMessage(ctx.from.id,"Misol uchun\n abcdabcdabcdabcdabcdabcdab")
    } else {
        ctx.telegram.sendMessage(ctx.from.id,"Javoblarni kiriting")
    }
}

function YangiTest(ctx) {
    console.log("salom");
}

function HisobniTekshirish(ctx) {
    console.log("salom");

}

function fanlarOrqaliTestOlish(fan, ctx) {
    if (fan == orqaga) {
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

