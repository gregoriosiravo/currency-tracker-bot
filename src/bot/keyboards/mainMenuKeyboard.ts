export const mainMenuKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "➕ Adicionar rastreamento", callback_data: "add_tracking" },
          { text: "🛠️ Atualizar objetivo", callback_data: "update_goal" },
        ],
        [
          { text: "🗑️ Excluir rastreamento", callback_data: "delete_tracking" },
          { text: "Listar rastreamentos", callback_data: "list_trackings" },
        ],
      ],
    },
  };
  