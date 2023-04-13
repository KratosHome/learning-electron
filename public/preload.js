const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('storeAPI', {
    getValue: async (key) => ipcRenderer.invoke('get-value', key),
    setValue: async (key, value) => ipcRenderer.invoke('set-value', key, value),
});

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
})



contextBridge.exposeInMainWorld('electron', {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
});
