const {ipc} = global.utils;
ipc.handle('cwd', () => process.cwd());
