
module.exports =  {
  gameOptions (translatedWords){
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: `${translatedWords[0]}`, callback_data: `${translatedWords[0]}`},
            { text: `${translatedWords[1]}`, callback_data: `${translatedWords[1]}` },
          ],
          [
            { text: `${translatedWords[2]}`, callback_data: `${translatedWords[2]}` },
            { text: `${translatedWords[3]}`, callback_data: `${translatedWords[3]}` },
          ],
        ],
      }),
    };
  },
  againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Играть еще раз', callback_data: '/again'}],
            ]
        })
      }
};
