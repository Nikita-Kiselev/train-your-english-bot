
const axios = require("axios");

async function fetchTranslatedWords(words) {
  const options = {
    method: "POST",
    url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.TRANSLATED_WORDS_API_KEY,
      "X-RapidAPI-Host": process.env.TRANSLATED_WORDS_API_HOST,
    },
    data: '{"from":"en","to":"ar","e":"","q":["hello","world","name"]}', 
  };
  options.data = JSON.stringify({
    "from": "en",
    "to": "ru",
    "e": "",
    "q": words,
  });

  let res = axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return res;
}

module.exports = fetchTranslatedWords;
