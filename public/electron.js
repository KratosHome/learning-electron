const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();
const fs = require("fs");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 3000,
        height: 3000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false, // Зміна на false
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

    // Додавання обробника подій для створення нового файлу
    ipcMain.handle('create-file', async () => {
        const options = {
            filters: [
                { name: 'Markdown', extensions: ['md'] },
            ],
        };
        const { filePath } = await dialog.showSaveDialog(options);
        if (filePath) {
            fs.writeFileSync(filePath, '');
            return filePath;
        }
    });

    // Додавання обробника подій для відкриття файлу
    ipcMain.handle('open-file', async () => {
        const options = {
            filters: [
                { name: 'Markdown', extensions: ['md'] },
            ],
        };
        const { canceled, filePaths } = await dialog.showOpenDialog(options);
        if (!canceled && filePaths.length > 0) {
            const content = fs.readFileSync(filePaths[0], 'utf8');
            return { filePath: filePaths[0], content };
        }
    });

    // Додавання обробника подій для збереження файлу
    ipcMain.handle('save-file', (event, content, filePath) => {
        fs.writeFileSync(filePath, content);
    });

    // Налаштування меню з пунктами "New", "Open" та "Save"
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click() {
                        win.webContents.send('create-file');
                    },
                },
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        win.webContents.send('open-file');
                    },
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click() {
                        win.webContents.send('save-file');
                    },
                },
            ],
        },
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

ipcMain.handle('get-value', (event, key) => {
    return store.get(key);
});

ipcMain.handle('set-value', (event, key, value) => {
    store.set(key, value);
});

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

app.whenReady().then(createWindow);
