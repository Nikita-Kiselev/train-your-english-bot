const axios = require("axios");

 function fetchRandomWords() {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "4" },
    headers: {
      "X-RapidAPI-Key": process.env.RANDOM_WORDS_API_KEY,
      "X-RapidAPI-Host": process.env.RANDOM_WORDS_API_HOST,
    },
  };

 let res = axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error);
    });
    return res;
}

module.exports = fetchRandomWords;
