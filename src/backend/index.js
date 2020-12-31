const { ipcMain } = require('electron');
const pathToRows = require("./pathsToRows");
const prepareData = require("./prepareData");
const groupedWords = require("./groupWords");

ipcMain.on('process-subtitles', (event, paths) => {
    pathToRows(paths)
        .then(prepareData)
        .then(groupedWords)
        .then(response => {
        event.reply('process-subtitles', response);
    });
});