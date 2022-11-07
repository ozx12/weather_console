const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const http = require('http');
require('dotenv').config();
const config =  require("./config");

//Определяем аргумент --city консольного приложения, 
const argv = yargs(hideBin(process.argv))
  .option('city', {
    alias: 'ct',
    type: 'sring',
    description: 'Название города, для которого требуется вывести прогноз ',
    default: 'Moscow'
  })
  .argv;


let myAPIKey;
let query =  argv.city;

//Проверяем определена ли переменная окружения, если нет берем из config.js
if (typeof process.env.myAPIKey !== 'undefined') {
  console.log('Переменная окружения определена');
  myAPIKey = process.env.myAPIKey;
} 
else {
  myAPIKey = defaultmyAPIKey;
  console.log('Переменная окружения не определена, ключ загружен из config.js');
}

//Формируем URL Get запроса
let url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${query}`;


//Get запрос
http.get(url, (res) => {
  const {statusCode} = res;
  if (statusCode !== 200){
      console.log(`statusCode: ${statusCode}`);
      return;
  }

  res.setEncoding('utf8');
  let rowData = '';
  res.on('data', (chunk) => rowData += chunk);
  res.on('end', () => {
      let parseData = JSON.parse(rowData);
      console.log(parseData);
  })
}).on('error', (err) => {
  console.error(err);
});



