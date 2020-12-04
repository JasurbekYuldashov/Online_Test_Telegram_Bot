const { Markup } = require("telegraf");
const { bot } = require("../core/bot");
const { buttons } = require("../constants/menuButtons")
const { findByUserId, getByUserIdOnUserModel, minusUserChashBack, userOnActive, getUsersCountOnDb, getAllUsersUserId } = require("../models/userModel");
const { YangiTestOlish } = require("./GetNewTest/TestOlish");
const { TestniTekshirish } = require("./CheckTest/TestniTekshirish");
const { YangiTest } = require("./CreateNewTest/YangiTestYaratish");
const { HisobniTekshirish, HisobimdagiPullar } = require("./CheckCashBack/HisobniTekshirish");
const { fanlarOrqaliTestOlish } = require("./GetNewTest/FanlarOrqaliTestOlish");
const { fanlar, orqaga } = require("../constants/subjects");
const { HomeMenu } = require("../actions/HomeMenu")
const { getLastUniqueId } = require("../models/documentsModel")
const { CashBackButtons } = require("../constants/CashBackButtons")
const { CountQuetion } = require("../constants/countQuetions");

let HisobniTeskshirishTugmasiBosilganmi = []

let YangiTestOlishTugmasiBosilganmi = []

let TestniTekshirishBosilganmi = [];
let id = [];
let answers = []

let YangiTestYaratishBosilganmi = [];
let YangiTestUniqId = [];
let YangiTestFileId = [];
let YangiTestJavoblari = [];
let YangiTestniUserIdsi = [];
let YangiTestFani = [];

let pulSorashTugmasiBosilganmi = [];
let pulMiqdori = [];
let telNumber1 = [];
let telNumber2 = [];

// let isSendUserMessage=false
let day = 8

bot.action("men_qayta_kannalga_azo_boldim", async ctx => {
	userOnActive(ctx.from);
	ctx.telegram.getChatMember(process.env.MY_CHANNEL_LINK, ctx.from.id).then(r => {
		if (r.status == "member" || r.status == "creator" || r.status == "administrator") {
			findByUserId(ctx.from).then(async r => {
				function setUniqueIdThere(ctx) {
					id[ctx.from.id] = 0;
				}

				if (ctx.updateType === "message") {
					if (ctx.update.message.text === buttons.testOlish) {
						YangiTestOlishTugmasiBosilganmi[ctx.from.id] = true;
						TestniTekshirishBosilganmi[ctx.from.id] = false;
						YangiTestYaratishBosilganmi[ctx.from.id] = false;
						HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = false;

						YangiTestUniqId[ctx.from.id] = 0;
						YangiTestFileId[ctx.from.id] = 0;
						YangiTestJavoblari[ctx.from.id] = "";
						YangiTestniUserIdsi[ctx.from.id] = 0;
						YangiTestFani[ctx.from.id] = "";

						id[ctx.from.id] = 0;
						answers[ctx.from.id] = "";

						YangiTestOlish(ctx)
					}

					if (ctx.update.message.text === buttons.testniTekshirish) {
						YangiTestOlishTugmasiBosilganmi[ctx.from.id] = false;
						TestniTekshirishBosilganmi[ctx.from.id] = true;
						YangiTestYaratishBosilganmi[ctx.from.id] = false;
						HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = false;

						YangiTestUniqId[ctx.from.id] = 0;
						YangiTestFileId[ctx.from.id] = 0;
						YangiTestJavoblari[ctx.from.id] = "";
						YangiTestniUserIdsi[ctx.from.id] = 0;
						YangiTestFani[ctx.from.id] = "";

						id[ctx.from.id] = 0;
						answers[ctx.from.id] = "";

						TestniTekshirish(ctx, id[ctx.from.id], answers[ctx.from.id], TestniTekshirishBosilganmi[ctx.from.id])
					}

					if (ctx.update.message.text === buttons.yangiTestYaratish) {
						YangiTestOlishTugmasiBosilganmi[ctx.from.id] = false;
						TestniTekshirishBosilganmi[ctx.from.id] = false;
						YangiTestYaratishBosilganmi[ctx.from.id] = true;
						HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = false;

						YangiTestUniqId[ctx.from.id] = 0;
						YangiTestFileId[ctx.from.id] = 0;
						YangiTestJavoblari[ctx.from.id] = "";
						YangiTestniUserIdsi[ctx.from.id] = 0;
						YangiTestFani[ctx.from.id] = "";

						id[ctx.from.id] = 0;
						answers[ctx.from.id] = "";

						YangiTest(
							ctx,
							YangiTestYaratishBosilganmi[ctx.from.id],
							YangiTestUniqId[ctx.from.id],
							YangiTestFileId[ctx.from.id],
							YangiTestJavoblari[ctx.from.id],
							YangiTestniUserIdsi[ctx.from.id],
							YangiTestFani[ctx.from.id])
					}

					if (ctx.update.message.text === buttons.hisobniTekshirish) {

						YangiTestOlishTugmasiBosilganmi[ctx.from.id] = false;
						TestniTekshirishBosilganmi[ctx.from.id] = false;
						YangiTestYaratishBosilganmi[ctx.from.id] = false;
						HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = true;

						YangiTestUniqId[ctx.from.id] = 0;
						YangiTestFileId[ctx.from.id] = 0;
						YangiTestJavoblari[ctx.from.id] = "";
						YangiTestniUserIdsi[ctx.from.id] = 0;
						YangiTestFani[ctx.from.id] = "";

						id[ctx.from.id] = 0;
						answers[ctx.from.id] = "";

						HisobniTekshirish(ctx)
					}

					if (YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
						// 1-bo'lim
						for (let i = 0; i < fanlar.length; i++) {
							if (fanlar[i] === ctx.update.message.text) {
								fanlarOrqaliTestOlish(fanlar[i], ctx);
								break;
							}
						}
					}

					if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
						// 2-bo'lim
						if (answers[ctx.from.id] === "" && ctx.update.message.text && id[ctx.from.id] !== 0) {
							if (ctx.update.message.text.length === 30) {
								answers[ctx.from.id] = ctx.update.message.text;
								TestniTekshirish(ctx, id[ctx.from.id], answers[ctx.from.id], TestniTekshirishBosilganmi[ctx.from.id]);
							} else {
								ctx.telegram.sendMessage(ctx.from.id, "Iltimos e'tiborli bo'ling.\nTest javoblari 30 talik bo'lishi kerak!!!")
								ctx.telegram.sendMessage(ctx.from.id, "Qaytadan javoblarni kiriting!!!")
							}

						} else if (answers[ctx.from.id] === "" && ctx.update.message.text && id[ctx.from.id] === 0 && ctx.update.message.text !== buttons.testniTekshirish) {
							id[ctx.from.id] = ctx.update.message.text;
							TestniTekshirish(ctx, id[ctx.from.id], answers[ctx.from.id], TestniTekshirishBosilganmi[ctx.from.id], setUniqueIdThere);
						}
					}

					// 3-bo'lim
					if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
						if (YangiTestUniqId[ctx.from.id] !== 0
							&& YangiTestFileId[ctx.from.id] !== 0
							&& YangiTestJavoblari[ctx.from.id] !== ""
							&& YangiTestJavoblari[ctx.from.id].length === 30
							&& YangiTestniUserIdsi[ctx.from.id] !== 0
							&& YangiTestFani[ctx.from.id] !== ""
						) {
							YangiTest(
								ctx,
								YangiTestYaratishBosilganmi[ctx.from.id],
								YangiTestUniqId[ctx.from.id],
								YangiTestFileId[ctx.from.id],
								YangiTestJavoblari[ctx.from.id],
								YangiTestniUserIdsi[ctx.from.id],
								YangiTestFani[ctx.from.id]);

							YangiTestYaratishBosilganmi[ctx.from.id] = false;
							YangiTestUniqId[ctx.from.id] = 0;
							YangiTestFileId[ctx.from.id] = 0;
							YangiTestJavoblari[ctx.from.id] = "";
							YangiTestniUserIdsi[ctx.from.id] = 0;
							YangiTestFani[ctx.from.id] = "";

						} else if (YangiTestUniqId[ctx.from.id] !== 0
							&& YangiTestFileId[ctx.from.id] !== 0
							&& YangiTestJavoblari[ctx.from.id] === ""
							&& YangiTestJavoblari[ctx.from.id].length === 0
							&& YangiTestniUserIdsi[ctx.from.id] !== 0
							&& YangiTestFani[ctx.from.id] !== ""
						) {
							if (ctx.update.message.text && ctx.update.message.text.length === 30) {
								YangiTestJavoblari[ctx.from.id] = ctx.update.message.text;
							}
							YangiTest(
								ctx,
								YangiTestYaratishBosilganmi[ctx.from.id],
								YangiTestUniqId[ctx.from.id],
								YangiTestFileId[ctx.from.id],
								YangiTestJavoblari[ctx.from.id],
								YangiTestniUserIdsi[ctx.from.id],
								YangiTestFani[ctx.from.id])
						} else if (YangiTestUniqId[ctx.from.id] !== 0
							&& YangiTestFileId[ctx.from.id] !== 0
							&& YangiTestJavoblari[ctx.from.id] === ""
							&& YangiTestJavoblari[ctx.from.id].length === 0
							&& YangiTestniUserIdsi[ctx.from.id] !== 0
							&& YangiTestFani[ctx.from.id] === ""
						) {
							if (ctx.update.message.text) {
								for (let i = 0; i < fanlar.length; i++) {
									if (fanlar[i] === ctx.update.message.text) {
										if (fanlar[i] === orqaga) {
											HomeMenu(ctx, true)
											break;
										} else {
											YangiTestFani[ctx.from.id] = ctx.update.message.text;
											HomeMenu(ctx, false);
											break;
										}
									}
								}
							}
							YangiTest(
								ctx,
								YangiTestYaratishBosilganmi[ctx.from.id],
								YangiTestUniqId[ctx.from.id],
								YangiTestFileId[ctx.from.id],
								YangiTestJavoblari[ctx.from.id],
								YangiTestniUserIdsi[ctx.from.id],
								YangiTestFani[ctx.from.id])
						} else if (YangiTestUniqId[ctx.from.id] === 0
							&& YangiTestFileId[ctx.from.id] === 0
							&& YangiTestJavoblari[ctx.from.id] === ""
							&& YangiTestJavoblari[ctx.from.id].length === 0
							&& YangiTestniUserIdsi[ctx.from.id] === 0
							&& YangiTestFani[ctx.from.id] === ""
							&& ctx.update.message.text !== buttons.yangiTestYaratish
						) {
							if (ctx.update.message.document) {
								getLastUniqueId().then(r => {
									YangiTestFileId[ctx.from.id] = ctx.update.message.document.file_id
									YangiTestUniqId[ctx.from.id] = parseInt(r + "") + 1;
									YangiTestniUserIdsi[ctx.from.id] = ctx.from.id;
									YangiTest(
										ctx,
										YangiTestYaratishBosilganmi[ctx.from.id],
										YangiTestUniqId[ctx.from.id],
										YangiTestFileId[ctx.from.id],
										YangiTestJavoblari[ctx.from.id],
										YangiTestniUserIdsi[ctx.from.id],
										YangiTestFani[ctx.from.id])
								}).catch(err => {
									ctx.telegram.sendMessage("Xatolik yuz berdi qaytadan urinib ko'ring");
								})
							}
						}
					}

					//4-bo'im
					if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
						if (ctx.update.message.text) {
							if (ctx.update.message.text === CashBackButtons.hisobniKorish) {
								HisobimdagiPullar(ctx)
							}

							if (pulMiqdori[ctx.from.id] === 0 && telNumber1[ctx.from.id] !== "" && telNumber2[ctx.from.id] !== "" && pulSorashTugmasiBosilganmi[ctx.from.id] === true && ctx.update.message.text) {
								if (parseInt(ctx.update.message.text) > 9000) {
									await getByUserIdOnUserModel(ctx.from.id).then(async r => {
										if (r.cashback >= parseInt(ctx.update.message.text)) {
											pulMiqdori[ctx.from.id] = parseInt(ctx.update.message.text);
											await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
											await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID2, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
											await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID3, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
											await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID4, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
											await minusUserChashBack(ctx.from.id, pulMiqdori[ctx.from.id]);
											telNumber1[ctx.from.id] = "";
											telNumber2[ctx.from.id] = "";
											pulMiqdori[ctx.from.id] = 0;
											pulSorashTugmasiBosilganmi[ctx.from.id] = false;
											ctx.telegram.sendMessage(ctx.from.id, "So'rov yuborildi. 24 soat ichida pulingiz telefon raqamingizga tushadi!");

										} else {
											ctx.telegram.sendMessage(ctx.from.id, `Sizning hisobigizda ${r.cashback} sum mavjud, va si kiritgan sum hisbingizdagidan ko'proq`)
										}
									})
								} else {
									ctx.telegram.sendMessage(ctx.from.id, "Kiritgan sumangiz 9000 SUMdan ko'p bo'lishi kerak.\nQaytadan SUMmani kiritng!")
								}
							}

							if (pulMiqdori[ctx.from.id] === 0 && telNumber1[ctx.from.id] !== "" && telNumber2[ctx.from.id] === "" && pulSorashTugmasiBosilganmi[ctx.from.id] === true && ctx.update.message.text) {
								telNumber2[ctx.from.id] = ctx.update.message.text;
								if (telNumber2[ctx.from.id] == telNumber1[ctx.from.id]) {
									await ctx.telegram.sendMessage(ctx.from.id, "Raqamlar mos keldi!!!");
									await ctx.telegram.sendMessage(ctx.from.id, "Summani kiriting!\nUnutmang kiritgan summangiz 9000 dan k'op b'lishi kerak");
								} else {
									ctx.telegram.sendMessage(ctx.from.id, "Raqamlar mos kelmadi!\nIltimos ikkala raqamni ham qayta kiriting\\Unutmang raqamlar birxil bo'lishi shart. Bu xavsizlik yuzasidan")
								}
							}

							if (pulMiqdori[ctx.from.id] === 0 && telNumber1[ctx.from.id] === "" && telNumber2[ctx.from.id] === "" && pulSorashTugmasiBosilganmi[ctx.from.id] === true && ctx.update.message.text) {
								telNumber1[ctx.from.id] = ctx.update.message.text;
								telNumber2[ctx.from.id] = "";
								ctx.telegram.sendMessage(ctx.from.id, "Tasdiqlash uchun qayta telefon raqamingizni kiriting!!!\nMasala: 991234567")
							}

							if (ctx.update.message.text === CashBackButtons.pulSorash) {
								telNumber1[ctx.from.id] = "";
								telNumber2[ctx.from.id] = "";
								pulMiqdori[ctx.from.id] = 0;
								await getByUserIdOnUserModel(ctx.from.id).then(async r => {
									if (r.cashback >= 9000) {
										pulSorashTugmasiBosilganmi[ctx.from.id] = true;
										await ctx.telegram.sendMessage(ctx.from.id, "Telefon raqamingizni kiriting!!!\nMasala: 991234567")
									} else {
										pulSorashTugmasiBosilganmi[ctx.from.id] = false;
										ctx.telegram.sendMessage(ctx.from.id, "Hisobingizda yetarli mablag' mavjud emas\nMablag' so'rash uchun kamida 9000 SUM pulingiz bo'lishi shart")
									}
								})
							}

							if (ctx.update.message.text === CashBackButtons.orqaga) {
								HomeMenu(ctx, true)
							}

						}
					}

					// 5-bo'lim orqaga
					if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] && ctx.update.message.text) {
						if (ctx.update.message.text == orqaga) {
							const keyboard = Markup.keyboard([
								Markup.button(buttons.pulIshlash),
								Markup.button(buttons.testOlish),
								Markup.button(buttons.testniTekshirish),
								Markup.button(buttons.yangiTestYaratish),
								Markup.button(buttons.hisobniTekshirish),
							], { columns: 2 });
							ctx.telegram.sendMessage(
								ctx.from.id,
								"Kerakli buyruqni tanlang!",
								{
									reply_markup: keyboard
								}
							);
						}
					}
				}
			});
		}
	}).catch(r => {
		console.log(r)
	});

})

bot.on("message", (async ctx => {
	userOnActive(ctx.from);
	ctx.telegram.getChatMember(process.env.MY_CHANNEL_LINK, ctx.from.id).then(r => {

		let dateForUserSendLink = new Date()

		if (dateForUserSendLink.getDay !== day) {
			day = dateForUserSendLink.getDay;
			console.log("here")
			getAllUsersUserId().then(users => {
				for (let i = 0; i < users.length; i++) {
					ctx.telegram.sendMessage(users[i], `Siz bu linkni do'stlaringizga yuboring va xar bir yangi qo'shilgan odam uchun pul ishlang!!!👇👇👇\n\n${process.env.MY_FRIEND_LINK + ctx.from.id}\n\nDo'stlaringizga ulashing!!!`)
				}
			}).catch(err => {
				console.log(err)
			})
		}


		if (r.status === "member" || r.status === "creator" || r.status === "administrator") {
			findByUserId(ctx.from).then(async response => {
				function setUniqueIdThere(ctx) {
					id[ctx.from.id] = 0;
				}

				// if (ctx.update.message.text) {
				if ((ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID2 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID3 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID4) && ctx.update.message.text === buttons.botHaqida) {
					YangiTestOlishTugmasiBosilganmi[ctx.from.id] = false;
					TestniTekshirishBosilganmi[ctx.from.id] = false;
					YangiTestYaratishBosilganmi[ctx.from.id] = false;
					HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = false;
					telNumber1[ctx.from.id] = "";
					telNumber2[ctx.from.id] = "";
					pulMiqdori[ctx.from.id] = 0;
					pulSorashTugmasiBosilganmi[ctx.from.id] = false;
					YangiTestUniqId[ctx.from.id] = 0;
					YangiTestFileId[ctx.from.id] = 0;
					YangiTestJavoblari[ctx.from.id] = "";
					YangiTestniUserIdsi[ctx.from.id] = 0;
					YangiTestFani[ctx.from.id] = "";

					id[ctx.from.id] = 0;
					answers[ctx.from.id] = "";
					await getUsersCountOnDb().then(res => {
						ctx.telegram.sendMessage(ctx.from.id, `Barcha userlar pullari: ${res.BalanceAllUsers}\nBir haftalik aktivlar: ${res.weekly}\nIkki haftalik aktivlar: ${res.twoWeekly}\nBir Oylik aktivlar: ${res.monthly}\nBir yillik aktivlar: ${res.yearly}`)
					})
				}

				if (ctx.update.message.text === buttons.pulIshlash) {
					ctx.telegram.sendMessage(ctx.from.id, `Siz bu linkni do'stlaringizga yuboring va xar bir yangi qo'shilgan odam uchun pul ishlang!!!👇👇👇\n\n${process.env.MY_FRIEND_LINK + ctx.from.id}\n\nDo'stlaringizga ulashing!!!`)
				}

				if (ctx.update.message.text === buttons.testOlish) {
					YangiTestOlishTugmasiBosilganmi[ctx.from.id] = true;
					TestniTekshirishBosilganmi[ctx.from.id] = false;
					YangiTestYaratishBosilganmi[ctx.from.id] = false;
					HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = false;
					telNumber1[ctx.from.id] = "";
					telNumber2[ctx.from.id] = "";
					pulMiqdori[ctx.from.id] = 0;
					pulSorashTugmasiBosilganmi[ctx.from.id] = false;
					YangiTestUniqId[ctx.from.id] = 0;
					YangiTestFileId[ctx.from.id] = 0;
					YangiTestJavoblari[ctx.from.id] = "";
					YangiTestniUserIdsi[ctx.from.id] = 0;
					YangiTestFani[ctx.from.id] = "";

					id[ctx.from.id] = 0;
					answers[ctx.from.id] = "";

					YangiTestOlish(ctx)
				}

				if (ctx.update.message.text === buttons.testniTekshirish) {
					YangiTestOlishTugmasiBosilganmi[ctx.from.id] = false;
					TestniTekshirishBosilganmi[ctx.from.id] = true;
					YangiTestYaratishBosilganmi[ctx.from.id] = false;
					HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = false;
					telNumber1[ctx.from.id] = "";
					telNumber2[ctx.from.id] = "";
					pulMiqdori[ctx.from.id] = 0;
					pulSorashTugmasiBosilganmi[ctx.from.id] = false;
					YangiTestUniqId[ctx.from.id] = 0;
					YangiTestFileId[ctx.from.id] = 0;
					YangiTestJavoblari[ctx.from.id] = "";
					YangiTestniUserIdsi[ctx.from.id] = 0;
					YangiTestFani[ctx.from.id] = "";

					id[ctx.from.id] = 0;
					answers[ctx.from.id] = "";

					TestniTekshirish(ctx, id[ctx.from.id], answers[ctx.from.id], TestniTekshirishBosilganmi[ctx.from.id])
				}

				if (ctx.update.message.text === buttons.yangiTestYaratish) {
					YangiTestOlishTugmasiBosilganmi[ctx.from.id] = false;
					TestniTekshirishBosilganmi[ctx.from.id] = false;
					YangiTestYaratishBosilganmi[ctx.from.id] = true;
					HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = false;

					YangiTestUniqId[ctx.from.id] = 0;
					YangiTestFileId[ctx.from.id] = 0;
					YangiTestJavoblari[ctx.from.id] = "";
					YangiTestniUserIdsi[ctx.from.id] = 0;
					YangiTestFani[ctx.from.id] = "";

					id[ctx.from.id] = 0;
					answers[ctx.from.id] = "";

					telNumber1[ctx.from.id] = "";
					telNumber2[ctx.from.id] = "";
					pulMiqdori[ctx.from.id] = 0;
					pulSorashTugmasiBosilganmi[ctx.from.id] = false;

					YangiTest(
						ctx,
						YangiTestYaratishBosilganmi[ctx.from.id],
						YangiTestUniqId[ctx.from.id],
						YangiTestFileId[ctx.from.id],
						YangiTestJavoblari[ctx.from.id],
						YangiTestniUserIdsi[ctx.from.id],
						YangiTestFani[ctx.from.id])
				}

				if (ctx.update.message.text === buttons.hisobniTekshirish) {

					YangiTestOlishTugmasiBosilganmi[ctx.from.id] = false;
					TestniTekshirishBosilganmi[ctx.from.id] = false;
					YangiTestYaratishBosilganmi[ctx.from.id] = false;
					HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] = true;
					telNumber1[ctx.from.id] = "";
					telNumber2[ctx.from.id] = "";
					pulMiqdori[ctx.from.id] = 0;
					pulSorashTugmasiBosilganmi[ctx.from.id] = false;
					YangiTestUniqId[ctx.from.id] = 0;
					YangiTestFileId[ctx.from.id] = 0;
					YangiTestJavoblari[ctx.from.id] = "";
					YangiTestniUserIdsi[ctx.from.id] = 0;
					YangiTestFani[ctx.from.id] = "";

					id[ctx.from.id] = 0;
					answers[ctx.from.id] = "";

					HisobniTekshirish(ctx)
				}

				// 1-bo'lim
				if (YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
					for (let i = 0; i < fanlar.length; i++) {
						if (fanlar[i] === ctx.update.message.text) {
							fanlarOrqaliTestOlish(fanlar[i], ctx);
							break;
						}
					}
				}

				// 2-bo'lim
				if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
					if (answers[ctx.from.id] === "" && ctx.update.message.text && id[ctx.from.id] !== 0) {
						if (ctx.update.message.text.length === 30) {
							answers[ctx.from.id] = ctx.update.message.text;
							TestniTekshirish(ctx, id[ctx.from.id], answers[ctx.from.id], TestniTekshirishBosilganmi[ctx.from.id]);
						} else {
							ctx.telegram.sendMessage(ctx.from.id, "Iltimos e'tiborli bo'ling.\nTest javoblari 30 talik bo'lishi kerak!!!")
							ctx.telegram.sendMessage(ctx.from.id, "Qaytadan javoblarni kiriting!!!")
						}

					} else if (answers[ctx.from.id] === "" && ctx.update.message.text && id[ctx.from.id] === 0 && ctx.update.message.text !== buttons.testniTekshirish) {
						id[ctx.from.id] = ctx.update.message.text;
						TestniTekshirish(ctx, id[ctx.from.id], answers[ctx.from.id], TestniTekshirishBosilganmi[ctx.from.id], setUniqueIdThere);
					}
				}

				// 3-bo'lim
				if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
					// let arraySubjects = fanlar.map(fan => Markup.button(fan));
					// const keyboard = Markup.keyboard([...arraySubjects]);

					// let inlineKeyboard = CountQuetion.map(res => Markup.callbackButton(res + "", res + "count"))
					// console.log(inlineKeyboard)
					// inlineKeyboard = Markup.inlineKeyboard([...inlineKeyboard], { columns: 4 });
					// ctx.telegram.sendMessage(ctx.from.id, "Yangi test nechta savollik?", { reply_markup: inlineKeyboard })
					//Barchasini 0 ga qaytaradi
					if (YangiTestUniqId[ctx.from.id] !== 0
						&& YangiTestFileId[ctx.from.id] !== 0
						&& YangiTestJavoblari[ctx.from.id] !== ""
						&& YangiTestJavoblari[ctx.from.id].length === 30
						&& YangiTestniUserIdsi[ctx.from.id] !== 0
						&& YangiTestFani[ctx.from.id] !== ""
					) {
						YangiTest(
							ctx,
							YangiTestYaratishBosilganmi[ctx.from.id],
							YangiTestUniqId[ctx.from.id],
							YangiTestFileId[ctx.from.id],
							YangiTestJavoblari[ctx.from.id],
							YangiTestniUserIdsi[ctx.from.id],
							YangiTestFani[ctx.from.id]);

						YangiTestYaratishBosilganmi[ctx.from.id] = false;
						YangiTestUniqId[ctx.from.id] = 0;
						YangiTestFileId[ctx.from.id] = 0;
						YangiTestJavoblari[ctx.from.id] = "";
						YangiTestniUserIdsi[ctx.from.id] = 0;
						YangiTestFani[ctx.from.id] = "";

					} else

						//Javoblarni o'zlashtirib oladi
						if (YangiTestUniqId[ctx.from.id] !== 0
							&& YangiTestFileId[ctx.from.id] !== 0
							&& YangiTestJavoblari[ctx.from.id] === ""
							&& YangiTestJavoblari[ctx.from.id].length === 0
							&& YangiTestniUserIdsi[ctx.from.id] !== 0
							&& YangiTestFani[ctx.from.id] !== ""
						) {
							if (ctx.update.message.text && ctx.update.message.text.length === 30) {
								YangiTestJavoblari[ctx.from.id] = ctx.update.message.text;
							}
							YangiTest(
								ctx,
								YangiTestYaratishBosilganmi[ctx.from.id],
								YangiTestUniqId[ctx.from.id],
								YangiTestFileId[ctx.from.id],
								YangiTestJavoblari[ctx.from.id],
								YangiTestniUserIdsi[ctx.from.id],
								YangiTestFani[ctx.from.id])
						} else

							// Fanni o'zlash tirib oladi
							if (YangiTestUniqId[ctx.from.id] !== 0
								&& YangiTestFileId[ctx.from.id] !== 0
								&& YangiTestJavoblari[ctx.from.id] === ""
								&& YangiTestJavoblari[ctx.from.id].length === 0
								&& YangiTestniUserIdsi[ctx.from.id] !== 0
								&& YangiTestFani[ctx.from.id] === ""
							) {
								if (ctx.update.message.text) {
									for (let i = 0; i < fanlar.length; i++) {
										if (fanlar[i] === ctx.update.message.text) {
											if (fanlar[i] === orqaga) {
												HomeMenu(ctx, true)
												break;
											} else {
												YangiTestFani[ctx.from.id] = ctx.update.message.text;
												HomeMenu(ctx, false);
												break;
											}
										}
									}
								}
								YangiTest(
									ctx,
									YangiTestYaratishBosilganmi[ctx.from.id],
									YangiTestUniqId[ctx.from.id],
									YangiTestFileId[ctx.from.id],
									YangiTestJavoblari[ctx.from.id],
									YangiTestniUserIdsi[ctx.from.id],
									YangiTestFani[ctx.from.id])
							} else

								//Faylni o'zlashtirb oladi
								if (YangiTestUniqId[ctx.from.id] === 0
									&& YangiTestFileId[ctx.from.id] === 0
									&& YangiTestJavoblari[ctx.from.id] === ""
									&& YangiTestJavoblari[ctx.from.id].length === 0
									&& YangiTestniUserIdsi[ctx.from.id] === 0
									&& YangiTestFani[ctx.from.id] === ""
									// && ctx.update.message.document
								) {
									if (ctx.update.message.document) {
										getLastUniqueId().then(r => {
											YangiTestFileId[ctx.from.id] = ctx.update.message.document.file_id
											YangiTestUniqId[ctx.from.id] = parseInt(r + "") + 1;
											YangiTestniUserIdsi[ctx.from.id] = ctx.from.id;
											YangiTest(
												ctx,
												YangiTestYaratishBosilganmi[ctx.from.id],
												YangiTestUniqId[ctx.from.id],
												YangiTestFileId[ctx.from.id],
												YangiTestJavoblari[ctx.from.id],
												YangiTestniUserIdsi[ctx.from.id],
												YangiTestFani[ctx.from.id])
										}).catch(err => {
											ctx.telegram.sendMessage("Xatolik yuz berdi qaytadan urinib ko'ring");
										})
									}
								}
				}

				//4-bo'im
				if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && HisobniTeskshirishTugmasiBosilganmi[ctx.from.id]) {
					if (ctx.update.message.text) {
						if (ctx.update.message.text === CashBackButtons.hisobniKorish) {
							HisobimdagiPullar(ctx)
						}

						if (pulMiqdori[ctx.from.id] === 0 && telNumber1[ctx.from.id] !== "" && telNumber2[ctx.from.id] !== "" && pulSorashTugmasiBosilganmi[ctx.from.id] === true && ctx.update.message.text) {
							if (parseInt(ctx.update.message.text) > 9000) {
								await getByUserIdOnUserModel(ctx.from.id).then(async r => {
									if (r.cashback >= parseInt(ctx.update.message.text)) {
										pulMiqdori[ctx.from.id] = parseInt(ctx.update.message.text);
										await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
										await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID2, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
										await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID3, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
										await ctx.telegram.sendMessage(process.env.BOT_MAIN_ADMIN_USERID4, `${telNumber1[ctx.from.id]}\nShu raqamga ${pulMiqdori[ctx.from.id]} SUM`);
										await minusUserChashBack(ctx.from.id, pulMiqdori[ctx.from.id]);
										telNumber1[ctx.from.id] = "";
										telNumber2[ctx.from.id] = "";
										pulMiqdori[ctx.from.id] = 0;
										pulSorashTugmasiBosilganmi[ctx.from.id] = false;
										ctx.telegram.sendMessage(ctx.from.id, "So'rov yuborildi. 24 soat ichida pulingiz telefon raqamingizga tushadi!");

									} else {
										ctx.telegram.sendMessage(ctx.from.id, `Sizning hisobigizda ${r.cashback} sum mavjud, va si kiritgan sum hisbingizdagidan ko'proq`)
									}
								})
							} else {
								ctx.telegram.sendMessage(ctx.from.id, "Kiritgan sumangiz 9000 SUMdan ko'p bo'lishi kerak.\nQaytadan SUMmani kiritng!")
							}
						}

						if (pulMiqdori[ctx.from.id] === 0 && telNumber1[ctx.from.id] !== "" && telNumber2[ctx.from.id] === "" && pulSorashTugmasiBosilganmi[ctx.from.id] === true && ctx.update.message.text) {
							telNumber2[ctx.from.id] = ctx.update.message.text;
							if (telNumber2[ctx.from.id] == telNumber1[ctx.from.id]) {
								await ctx.telegram.sendMessage(ctx.from.id, "Raqamlar mos keldi!!!");
								await ctx.telegram.sendMessage(ctx.from.id, "Summani kiriting!\nUnutmang kiritgan summangiz 9000 dan k'op b'lishi kerak");
							} else {
								ctx.telegram.sendMessage(ctx.from.id, "Raqamlar mos kelmadi!\nIltimos ikkala raqamni ham qayta kiriting\\Unutmang raqamlar birxil bo'lishi shart. Bu xavsizlik yuzasidan")
							}
						}

						if (pulMiqdori[ctx.from.id] === 0 && telNumber1[ctx.from.id] === "" && telNumber2[ctx.from.id] === "" && pulSorashTugmasiBosilganmi[ctx.from.id] === true && ctx.update.message.text) {
							telNumber1[ctx.from.id] = ctx.update.message.text;
							telNumber2[ctx.from.id] = "";
							ctx.telegram.sendMessage(ctx.from.id, "Tasdiqlash uchun qayta telefon raqamingizni kiriting!!!\nMasala: 991234567")
						}

						if (ctx.update.message.text === CashBackButtons.pulSorash) {
							telNumber1[ctx.from.id] = "";
							telNumber2[ctx.from.id] = "";
							pulMiqdori[ctx.from.id] = 0;
							await getByUserIdOnUserModel(ctx.from.id).then(async r => {
								if (r.cashback >= 9000) {
									pulSorashTugmasiBosilganmi[ctx.from.id] = true;
									await ctx.telegram.sendMessage(ctx.from.id, "Telefon raqamingizni kiriting!!!\nMasala: 991234567")
								} else {
									pulSorashTugmasiBosilganmi[ctx.from.id] = false;
									ctx.telegram.sendMessage(ctx.from.id, "Hisobingizda yetarli mablag' mavjud emas\nMablag' so'rash uchun kamida 9000 SUM pulingiz bo'lishi shart")
								}
							})
						}

						if (ctx.update.message.text === CashBackButtons.orqaga) {
							HomeMenu(ctx, true)
						}

					}
				}

				// 5-bo'lim orqaga
				if (!YangiTestOlishTugmasiBosilganmi[ctx.from.id] && !TestniTekshirishBosilganmi[ctx.from.id] && !YangiTestYaratishBosilganmi[ctx.from.id] && !HisobniTeskshirishTugmasiBosilganmi[ctx.from.id] && ctx.update.message.text) {
					if (ctx.update.message.text == orqaga) {
						let keyboard = Markup.keyboard([
							Markup.button(buttons.pulIshlash),
							Markup.button(buttons.testOlish),
							Markup.button(buttons.testniTekshirish),
							Markup.button(buttons.yangiTestYaratish),
							Markup.button(buttons.hisobniTekshirish),
						], { columns: 2 });
						if (ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID2 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID3 || ctx.from.id == process.env.BOT_MAIN_ADMIN_USERID4) {
							keyboard = Markup.keyboard([
								Markup.button(buttons.pulIshlash),
								Markup.button(buttons.testOlish),
								Markup.button(buttons.testniTekshirish),
								Markup.button(buttons.yangiTestYaratish),
								Markup.button(buttons.hisobniTekshirish),
								Markup.button(buttons.botHaqida),
							], { columns: 2 })
						}
						ctx.telegram.sendMessage(
							ctx.from.id,
							"Kerakli buyruqni tanlang!",
							{
								reply_markup: keyboard
							}
						);
					}
				}
			});
		} else {
			let keyboard = Markup.inlineKeyboard([
				Markup.urlButton("Kanalga Kirish", `https://t.me/${process.env.MY_CHANNEL_LINK_NOT}`),
				Markup.callbackButton("✅ Tekshirish", "men_qayta_kanalga_azo_boldim")
			]);
			ctx.telegram.sendMessage(ctx.from.id, "Botdan foydalanish uchun bizning kanalga a'zo bo'lishingiz shart!!!", { reply_markup: keyboard })
		}
	}).catch(r => {
		console.log(r)
	})

}));

