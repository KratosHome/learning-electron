const path = require('path');
const {app, BrowserWindow, ipcMain, Menu, dialog} = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();
const fs = require("fs")

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        minWidth: 400,
        minHeight: 300,
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
        win.webContents.openDevTools({mode: 'detach'});
    }


    // context menu
    const isMac = process.platform === 'darwin'
    const template = [
        ...(isMac ? [{
            label: app.name,
            submenu: [
                {
                    label: 'open file',
                    accelerator: "Comand+o",
                    click() {

                    }
                },
                {role: 'about'},
                {type: 'separator'},
                {role: 'services'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideOthers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        }] : []),
        {
            label: 'File',
            submenu: [
                isMac ? {role: 'close'} : {role: 'quit'},
                {type: 'separator'}, // Додаємо роздільник, щоб візуально відокремити вашу кнопку від інших пунктів меню
                {
                    label: 'My Custom Button', // Назва вашої кнопки
                    click() {
                        console.log('My Custom Button clicked'); // Функція, яка виконується при натисканні на кнопку
                    },
                },
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                ...(isMac ? [
                    {role: 'pasteAndMatchStyle'},
                    {role: 'delete'},
                    {role: 'selectAll'},
                    {type: 'separator'},
                    {
                        label: 'Speech',
                        submenu: [
                            {role: 'startSpeaking'},
                            {role: 'stopSpeaking'}
                        ]
                    }
                ] : [
                    {role: 'delete'},
                    {type: 'separator'},
                    {role: 'selectAll'}
                ])
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forceReload'},
                {role: 'toggleDevTools'},
                {type: 'separator'},
                {role: 'resetZoom'},
                {role: 'zoomIn'},
                {role: 'zoomOut'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            label: 'Window',
            submenu: [
                {role: 'minimize'},
                {role: 'zoom'},
                ...(isMac ? [
                    {type: 'separator'},
                    {role: 'front'},
                    {type: 'separator'},
                    {role: 'window'}
                ] : [
                    {role: 'close'}
                ])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const {shell} = require('electron')
                        await shell.openExternal('https://electronjs.org')
                    }
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu)



}

ipcMain.handle("get-files-and-folders", (event, directoryPath) => {
    const filesAndFolders = fs.readdirSync(directoryPath);
    const result = filesAndFolders.map((item) => {
        const itemPath = path.join(directoryPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();
        return { name: item, path: itemPath, isDirectory };
    });
    return result;
});

ipcMain.handle("create-folder", (event, directoryPath, folderName) => {
    const newFolderPath = path.join(directoryPath, folderName);
    if (!fs.existsSync(newFolderPath)) {
        fs.mkdirSync(newFolderPath);
    }
    return newFolderPath;
});

ipcMain.handle("open-folder-dialog", async () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    const result = await dialog.showOpenDialog(focusedWindow, {
        properties: ["openDirectory"],
    });

    if (!result.canceled) {
        return result.filePaths[0];
    }

    return null;
});
// ... your existing electron code

ipcMain.handle("read-file", async (event, filePath) => {
    console.log(`Handling read-file request for: ${filePath}`);
    try {
        const fileExtension = path.extname(filePath).toLowerCase();
        const encoding = fileExtension === ".md" || fileExtension === ".markdown" ? "utf-8" : "base64";
        const content = await fs.promises.readFile(filePath, { encoding });
        console.log(`File content: ${content}`);
        return content;
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
});

ipcMain.handle("write-file", async (event, filePath, content) => {
    console.log(`Handling write-file request for: ${filePath}`);
    try {
        await fs.promises.writeFile(filePath, content, { encoding: "utf-8" });
        console.log("File successfully written");
        return true;
    } catch (error) {
        console.error("Error writing file:", error);
        return false;
    }
});



app.whenReady().then(() => {
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
    createWindow()
});

