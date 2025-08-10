import Store from "electron-store";
import dotenv from "dotenv";
dotenv.config();

const store = new Store({
  encryptionKey: process.env.STORE_KEY,
});

export default store;
