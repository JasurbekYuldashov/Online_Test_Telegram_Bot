const {Markup} = require("telegraf");
const {howMuchMyMoney} =require("../../models/userModel")
const {CashBackButtons} = require("../../constants/CashBackButtons");

function HisobniTekshirish(ctx) {
    let arraySubjects = [Markup.button(CashBackButtons.hisobniKorish),Markup.button(CashBackButtons.pulSorash),Markup.button(CashBackButtons.orqaga)]
    const keyboard = Markup.keyboard([...arraySubjects]);
    ctx.telegram.sendMessage(ctx.from.id,"Kerakli buruqni tanlang!",{reply_markup:keyboard});
}

async function HisobimdagiPullar(ctx){
    let userCashBack = 0
    await howMuchMyMoney(ctx.from.id).then(r=>{
        userCashBack = r;
    })
    let str = `Foydalanuvchi: ${ctx.from.username} \nHisobingizda ${userCashBack} SUM mavjud`
    ctx.telegram.sendMessage(ctx.from.id,str)
}

exports.HisobniTekshirish = HisobniTekshirish
exports.HisobimdagiPullar = HisobimdagiPullar