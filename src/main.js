import { BrowserWindow, app, ipcMain } from "electron";
import Store from "electron-store";
const store = new Store();
import dotenv from "dotenv";
dotenv.config();

let loginWindow;
let mainWindow;

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  loginWindow.loadFile("public/login.html");
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("public/main.html");
}

app.whenReady().then(() => {
  createLoginWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow();
  });
});

ipcMain.on("check-password", (event, inputPassword) => {
  if (inputPassword === process.env.APP_PASSWORD) {
    loginWindow.close();
    createMainWindow();
  } else {
    event.reply("wrong-password", "Password Salah Test!");
  }
});

ipcMain.on("save-bank", (event, data) => {
  store.set("bank", data);
  console.info("data bank tersimpan : " + data);
  event.reply("bank-saved");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
