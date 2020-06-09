const express = require('express');
const fs = require('fs').promises;
global.fileName = './data/grades.json';
global.gradesData = null;

const gradesRouter = require('./routes/grades.js');
const infoRouter = require('./routes/info.js');
const app = express();

app.use(express.json());

app.use('/grades', gradesRouter);
app.use('/info', infoRouter);


app.listen(3000, async () => {
   
  try {
    const gradesFile = await fs.readFile(global.fileName, 'utf-8');
    gradesData = JSON.parse(gradesFile);
    console.log('API Working');
  } catch(err) {
      console.error(err.message);
    }
});
