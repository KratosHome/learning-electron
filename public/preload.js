const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('storeAPI', {
    getValue: async (key) => ipcRenderer.invoke('get-value', key),
    setValue: async (key, value) => ipcRenderer.invoke('set-value', key, value),
});
