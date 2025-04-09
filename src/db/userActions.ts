import { User } from '../models/User';

export const createOrUpdateUser = async (chatId: string, currency: string, goal: number) => {
  try {
    let user = await User.findOne({ chatId });

    if (!user) {
      user = new User({ chatId, trackedCurrencies: [] });
    }

    const existingCurrency = user.trackedCurrencies.find((trackedCurrency) => trackedCurrency.currency === currency);
    if (existingCurrency) {
      existingCurrency.goal = goal;
    } else {
      user.trackedCurrencies.push({ currency, goal });
    }

    await user.save();
    console.log(`User data with chatId: ${chatId} correctly updated.`);
  } catch (error) {
    console.error('❌ Error writing for the user: ', error);
  }
};

export const getUser = async (chatId: string) => {
    try {
      const user = await User.findOne({ chatId });
  
      if (!user) {
        console.log(`❌ User ${chatId} not found.`);
        return null;
      }
  
      console.log(`✅ User data ${chatId}:`, user);
      return user;
    } catch (error) {
      console.error('❌ Error while retrieving data: ', error);
      return null;
    }
  };
  
  export const updateTrackedCurrencyGoal = async (chatId: string, currency: string, newGoal: number) => {
    try {
      const user = await User.findOne({ chatId });
  
      if (!user) {
        console.log(`❌ User ${chatId} non found.`);
        return;
      }
  
      const trackedCurrency = user.trackedCurrencies.find((tc) => tc.currency === currency);
      if (trackedCurrency) {
        trackedCurrency.goal = newGoal;
        await user.save();
        console.log(`✅ Goal updated ${currency} for User ${chatId}`);
      } else {
        console.log(`❌ the currency ${currency} is not present ${chatId}`);
      }
    } catch (error) {
      console.error('❌ Error while updating currency tracker:', error);
    }
  };
  
  export const removeTrackedCurrency = async (chatId: string, currency: string) => {
    try {
      const user = await User.findOne({ chatId });
  
      if (!user) {
        console.log(`❌ User ${chatId} not found.`);
        return;
      }
  
      // Rimuovi la valuta tracciata
      user.trackedCurrencies = user.trackedCurrencies.filter((tc) => tc.currency !== currency);
  
      // Salva le modifiche
      await user.save();
      console.log(`✅ Currency ${currency} removed for user ${chatId}`);
    } catch (error) {
      console.error('❌ Error while removing currency:', error);
    }
  };
  