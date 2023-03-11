require('dotenv').config();
const TelegramApi = require("node-telegram-bot-api");
const fetchRandomWords = require("./fetchRandomWords.js");
const fetchTranslatedWords = require("./fetchTranslatedWords.js");
const { gameOptions, againOptions } = require("./options.js");
const token = process.env.TOKEN;

const TelegramBot = new TelegramApi(token, { polling: true });

const chats = {}; // {userId: correctAnswer}   store users Id and correct answers

TelegramBot.setMyCommands([
  { command: "/game", description: "Начать игру" },
  { command: "/help", description: "Правила игры" },
]);

async function startGame(chatId) {
  try {
    const randomWords = await fetchRandomWords();
    const translatedWords = await fetchTranslatedWords(randomWords);
    chats[chatId] = translatedWords[0];
    await TelegramBot.sendMessage(
      chatId,
      `Как переводится слово ${randomWords[0]}`
    );
    return TelegramBot.sendMessage(
      chatId,
      "Вот несколько вариантов ответа:",
      gameOptions(translatedWords)
    );
  } catch (err) {
    console.warn(err);
  }
}

TelegramBot.on("message", async (msg) => {
  try {
    const text = msg.text;
    const chatId = msg.from.id;
    if (text === "/start") {
      await TelegramBot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/192/39.webp"
      );
      return TelegramBot.sendMessage(chatId, "Wazzuupp! Готов начать игру?");
    }

    if (text === "/game") {
      startGame(chatId);
    }
    if (text === "/help") {
      return TelegramBot.sendMessage(
        chatId,
        "Тебе будет даваться слово и 4 варианта ответа, твоя задача правильно перевести слово."
      );
    }
  } catch (err) {
    console.warn(err);
    return TelegramBot.sendMessage(chatId, "Я тебя не понимаю :(");
  }
});

TelegramBot.on("callback_query", async (msg) => {
  try {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data == chats[chatId]) {
      await TelegramBot.sendMessage(
        chatId,
        `Поздравляю, ты правильно перевёл слово ${chats[chatId]}`,
        againOptions
      );
    } else {
      await TelegramBot.sendMessage(
        chatId,
        `К сожалению ты не правильно первёл слово, оно переводится как ${chats[chatId]}`,
        againOptions
      );
    }
  } catch (err) {
    console.warn(err);
  }
});
