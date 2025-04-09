export const mainMenuKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "➕ Add Tracking", callback_data: "add_tracking" },
          { text: "🛠️ Update Goal", callback_data: "update_goal" },
        ],
        [
          { text: "🗑️ Delete Tracking", callback_data: "delete_tracking" },
          { text: "List Trackings", callback_data: "list_trackings" },
        ],
      ],
    },
  };
  