const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 3000,
        height: 3000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    // and load the index.html of the app.
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('get-value', (event, key) => {
    return store.get(key);
});

ipcMain.handle('set-value', (event, key, value) => {
    store.set(key, value);
});
