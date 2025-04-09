export const currencyKeyboard = {
    reply_markup: {
      inline_keyboard: [
       [
              { text: "USD 🇺🇸", callback_data: "currency_USD" },
              { text: "EUR 🇪🇺", callback_data: "currency_EUR" },
            ],
            [
              { text: "JPY 🇯🇵", callback_data: "currency_JPY" },
              { text: "CNY 🇨🇳", callback_data: "currency_CNY" },
            ],
            [
              { text: "GBP 🇬🇧", callback_data: "currency_GBP" },
              { text: "AUD 🇦🇺", callback_data: "currency_AUD" },
            ],
      ],
    },
  };
  