import { BrowserWindow, app, ipcMain } from "electron";
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

  loginWindow.loadFile("src/views/login.html");
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("src/views/p.html");
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
    event.reply("wrong-password", "Password Salah2!");
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
