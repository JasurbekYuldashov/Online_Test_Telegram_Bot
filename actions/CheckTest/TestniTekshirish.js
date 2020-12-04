const telegraph = require("telegraph-node")
const { getByUniqueIdOnDocuments } = require("../../models/documentsModel")
const { getForPostTelegraph, getOrSaveStatistic } = require("../../models/statisticsModel")

async function TestniTekshirish(ctx, id, answers, TestniTekshirishBosilganmi, setUniqueIdThero) {
	if (id !== 0 && answers !== "" && TestniTekshirishBosilganmi) {
		let docs = [];
		let result = [];
		result[ctx.from.id] = [];
		await getByUniqueIdOnDocuments(id).then(async r => {
			docs[ctx.from.id] = r;
		})
		if (docs[ctx.from.id] !== null) {
			// let answers = []
			let atrue = "✅"
			let bfalse = "❌"
			answers = answers.toLowerCase() + "";
			let ball = 0;
			for (let i = 0; i < 30; i++) {
				if (answers.charAt(i) == docs[ctx.from.id].answers.charAt(i)) {
					ball++
				}
			}
			await getOrSaveStatistic(ctx.from.id, ctx.from.first_name, docs[ctx.from.id]._id + "", ball).then(async r => {
				// console.log(r,"get or save");
				await getForPostTelegraph(ctx.from.id, docs[ctx.from.id]._id).then(response => {
					console.log(response.allResult)
					result[ctx.from.id] = [...result[ctx.from.id], { tag: "h3", children: [`Sizning o'rningiz: ${response.myResult + 1}`] }];
					for (let i = 0; i < response.allResult.length; i++) {
						console.log(response.allResult[i].first_name)
						result[ctx.from.id] = [...result[ctx.from.id], {
							tag: "h3",
							children: [(i + 1) + ") " + response.allResult[i].first_name + " | " + response.allResult[i].userCorrectAnswers]
						}];
					}
				});
			});
			// bu yerda kodlarni reformat qilman!!!!! (pls)
			let yozuv = `Test varianti raqami: ${id} \nTo'g'ri javoblar soni: ${ball} \nNoto'g'ri javoblar soni: ${30 - ball} \n
  1) ${answers.charAt(0).toUpperCase()} ${answers.charAt(0) == docs[ctx.from.id].answers.charAt(0) ? atrue : bfalse}    11) ${answers.charAt(10).toUpperCase()} ${answers.charAt(10) == docs[ctx.from.id].answers.charAt(10) ? atrue : bfalse}    21) ${answers.charAt(20).toUpperCase()} ${answers.charAt(20) == docs[ctx.from.id].answers.charAt(20) ? atrue : bfalse}
  2) ${answers.charAt(1).toUpperCase()} ${answers.charAt(1) == docs[ctx.from.id].answers.charAt(1) ? atrue : bfalse}    12) ${answers.charAt(11).toUpperCase()} ${answers.charAt(11) == docs[ctx.from.id].answers.charAt(11) ? atrue : bfalse}    22) ${answers.charAt(21).toUpperCase()} ${answers.charAt(21) == docs[ctx.from.id].answers.charAt(21) ? atrue : bfalse}
  3) ${answers.charAt(2).toUpperCase()} ${answers.charAt(2) == docs[ctx.from.id].answers.charAt(2) ? atrue : bfalse}    13) ${answers.charAt(12).toUpperCase()} ${answers.charAt(12) == docs[ctx.from.id].answers.charAt(12) ? atrue : bfalse}    23) ${answers.charAt(22).toUpperCase()} ${answers.charAt(22) == docs[ctx.from.id].answers.charAt(22) ? atrue : bfalse}
  4) ${answers.charAt(3).toUpperCase()} ${answers.charAt(3) == docs[ctx.from.id].answers.charAt(3) ? atrue : bfalse}    14) ${answers.charAt(13).toUpperCase()} ${answers.charAt(13) == docs[ctx.from.id].answers.charAt(13) ? atrue : bfalse}    24) ${answers.charAt(23).toUpperCase()} ${answers.charAt(23) == docs[ctx.from.id].answers.charAt(23) ? atrue : bfalse}
  5) ${answers.charAt(4).toUpperCase()} ${answers.charAt(4) == docs[ctx.from.id].answers.charAt(4) ? atrue : bfalse}    15) ${answers.charAt(14).toUpperCase()} ${answers.charAt(14) == docs[ctx.from.id].answers.charAt(14) ? atrue : bfalse}    25) ${answers.charAt(24).toUpperCase()} ${answers.charAt(24) == docs[ctx.from.id].answers.charAt(24) ? atrue : bfalse}
  6) ${answers.charAt(5).toUpperCase()} ${answers.charAt(5) == docs[ctx.from.id].answers.charAt(5) ? atrue : bfalse}    16) ${answers.charAt(15).toUpperCase()} ${answers.charAt(15) == docs[ctx.from.id].answers.charAt(15) ? atrue : bfalse}    26) ${answers.charAt(25).toUpperCase()} ${answers.charAt(25) == docs[ctx.from.id].answers.charAt(25) ? atrue : bfalse}
  7) ${answers.charAt(6).toUpperCase()} ${answers.charAt(6) == docs[ctx.from.id].answers.charAt(6) ? atrue : bfalse}    17) ${answers.charAt(16).toUpperCase()} ${answers.charAt(16) == docs[ctx.from.id].answers.charAt(16) ? atrue : bfalse}    27) ${answers.charAt(26).toUpperCase()} ${answers.charAt(26) == docs[ctx.from.id].answers.charAt(26) ? atrue : bfalse}
  8) ${answers.charAt(7).toUpperCase()} ${answers.charAt(7) == docs[ctx.from.id].answers.charAt(7) ? atrue : bfalse}    18) ${answers.charAt(17).toUpperCase()} ${answers.charAt(17) == docs[ctx.from.id].answers.charAt(17) ? atrue : bfalse}    28) ${answers.charAt(27).toUpperCase()} ${answers.charAt(27) == docs[ctx.from.id].answers.charAt(27) ? atrue : bfalse}
  9) ${answers.charAt(8).toUpperCase()} ${answers.charAt(8) == docs[ctx.from.id].answers.charAt(8) ? atrue : bfalse}    19) ${answers.charAt(18).toUpperCase()} ${answers.charAt(18) == docs[ctx.from.id].answers.charAt(18) ? atrue : bfalse}    29) ${answers.charAt(28).toUpperCase()} ${answers.charAt(28) == docs[ctx.from.id].answers.charAt(28) ? atrue : bfalse}
10) ${answers.charAt(9).toUpperCase()} ${answers.charAt(9) == docs[ctx.from.id].answers.charAt(9) ? atrue : bfalse}    20) ${answers.charAt(19).toUpperCase()} ${answers.charAt(19) == docs[ctx.from.id].answers.charAt(19) ? atrue : bfalse}   30) ${answers.charAt(29).toUpperCase()} ${answers.charAt(29) == docs[ctx.from.id].answers.charAt(29) ? atrue : bfalse}
            `
			ctx.telegram.sendMessage(ctx.from.id, yozuv);
			const ph = new telegraph();
			await ph.createPage(process.env.TOKEN_TELEGRAPH, 'Test Turon', [...result[ctx.from.id]], { return_content: true }).then((resultat) => {
				// console.log(resultat.content)
				ctx.telegram.sendMessage(ctx.from.id, `Shu test bo'yicha statistika bu yerda ${resultat.url}`)
			});
		} else {
			ctx.telegram.sendMessage(ctx.from.id, "Bunday id (aydi) lik test topilmadi!!!\n Iltimos qaytadan urinib ko'ring");
		}
	} else if (id !== 0 && answers === "" && TestniTekshirishBosilganmi) {
		let docs = []
		await getByUniqueIdOnDocuments(id).then(r => {
			docs[ctx.from.id] = r
		})
		if (docs[ctx.from.id] === null) {
			ctx.telegram.sendMessage(ctx.from.id, "Bunday id (aydi) lik test topilmadi!!!\n Iltimos qaytadan urinib ko'ring");
			setUniqueIdThero(ctx);
		} else {
			ctx.telegram.sendMessage(ctx.from.id, "Javoblarni kiriting! \n abcdabcdabcdabcdabcdabcdab");
		}
	} else {
		ctx.telegram.sendMessage(ctx.from.id, "Test id sini kiriting!");
	}
}


exports.TestniTekshirish = TestniTekshirish;
