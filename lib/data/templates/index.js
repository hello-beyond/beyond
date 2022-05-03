const {ipc} = global.utils;
ipc.handle('templates', () => global.templates);
