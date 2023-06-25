const fs = require('fs');

/**
 * Function to read data from a given file
 * @param {string} file The path to the file you want to read from.
 * @returns {Promise<string>} A promise that resolves with the file content.
 */
const readFromFile = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

/**
 * Function to write data to a given file
 * @param {string} destination The path to the file you want to write to.
 * @param {object} content The content you want to write to the file.
 * @returns {Promise<void>} A promise that resolves when the file is written successfully.
 */
const writeToFile = (destination, content) =>
  new Promise((resolve, reject) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.info(`\nData written to ${destination}`);
        resolve();
      }
    });
  });

/**
 * Function to read data from a given file and append some content
 * @param {object} content The content you want to append to the file.
 * @param {string} file The path to the file you want to save to.
 * @returns {Promise<void>} A promise that resolves when the content is appended successfully.
 */
const readAndAppend = (content, file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData)
          .then(resolve)
          .catch(reject);
      }
    });
  });

module.exports = { readFromFile, writeToFile, readAndAppend };
