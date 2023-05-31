// const mqtt = require('mqtt');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const SensorData = require('./models/eventsModel');
const fs = require('fs');
const fetch = require('node-fetch');
// const { error } = require('console');

// const host = 'broker.hivemq.com';
// const port = '1883';
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

// const connectUrl = `mqtt://${host}:${port}`;
// console.log(connectUrl);
// const client = mqtt.connect(connectUrl);

// dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
// // console.log(DB);
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('DB connection successfull !!'));

// const topic = 'tele/Sri_tasmota/SENSOR';

// client.on('connect', async () => {
//   console.log('Connected');

//   client.subscribe(topic);
// });

// client.on('message', async (topic, message) => {
//   console.log(typeof message);
//   await
// });
const IP = '192.168.137.119';
const URL = `http://${IP}/cm?cmnd=status%208`;
const getDataFromSensor = async () => {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.StatusSNS;
  } catch (err) {
    console.log(err);
  }
};

const getAndStoreData = async () => {
  await setInterval(async () => {
    const data = await getDataFromSensor();
    console.log(data);
    await writeToLogFile(JSON.stringify(data));
  }, 3000);
};

const writeStream = fs.createWriteStream('sensorData.json', { flags: 'a' }); // 'a' flag appends to the file

// Function to continuously write to the file
async function writeToLogFile(data) {
  await writeStream.write(data + '\n'); // Append data and a newline character to the file
}

getAndStoreData();
