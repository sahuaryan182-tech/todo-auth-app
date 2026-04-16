const fs = require('fs');

const readData = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return [];

    const data = fs.readFileSync(filePath, 'utf-8');

    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.log('Error reading file:', error.message);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.log('Error writing file:', error.message);
  }
};

module.exports = { readData, writeData };