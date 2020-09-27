const {findById} = require("../../models/userViewTest")
const {HomeMenu} = require("../HomeMenu")
const {orqaga, fanlar} = require("../../constants/subjects")

function fanlarOrqaliTestOlish(fan, ctx) {
    if (fan === orqaga) {
        HomeMenu(ctx)
    } else {
        for (let i = 0; i < fanlar.length - 1; i++) {
            if (fan === fanlar[i]) {
                ctx.telegram.sendMessage(ctx.from.id, "Buyurtaming tez oradi jo'natiladi");
                // findById(ctx.from.id).then(r => {
                //     console.log(r)
                // })
                HomeMenu(ctx);
            }
        }
    }
}

exports.fanlarOrqaliTestOlish = fanlarOrqaliTestOlish;