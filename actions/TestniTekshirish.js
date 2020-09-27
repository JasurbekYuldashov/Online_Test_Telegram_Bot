var TestniTekshirishBosilganmi = false;
var id = 0;

function TestniTekshirish(ctx) {
    if (TestniTekshirishBosilganmi){
        ctx.telegram.sendMessage(ctx.from.id,"Javoblarni kiriting")
        ctx.telegram.sendMessage(ctx.from.id,"Misol uchun\n abcdabcdabcdabcdabcdabcdab")
    } else {
        TestniTekshirishBosilganmi=true
        ctx.telegram.sendMessage(ctx.from.id,"Test id sini kiriting!");
    }
}

exports.TestniTekshirish = TestniTekshirish