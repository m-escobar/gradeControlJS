var express = require('express');
var fs = require('fs').promises;

var router = express.Router();

router.get('/', (_, res) => {
  try {
    let data = gradesData;
    delete data.nextId;
    res.send(data);
    } catch (err) {
        res.status(400).send({ error: err.message});
        console.error(`GET /grades - ${err.message}`);
    }
});


router.get('/:id', async (req, res) => {
  try {
    let data = gradesData;
    const grade = data.grades.find(grades => grades.id === parseInt(req.params.id, 10));

    if (grade) {
      res.send(grade);
    } else {
      res.status(400).send({error: 'Grade not found'});
      console.error('GET /grades/:id - Grade not found');
    }
  } catch {
    res.status(400).send({ error: err.message});
    console.error(`GET /grades/:id - ${err.message}`);
  };
});

router.post('/', async (req, res) => {
  try {
    let params = req.body;
    let data = gradesData;

    let grade = { id: data.nextId, ...params};
    data.nextId++;
    data.grades.push(grade);

    await fs.writeFile(global.fileName, JSON.stringify(data));
    
    res.send({"New Grade": grade});
  } catch (err) {
      res.status(400).send({ error: err.message });
      console.error(`POST /grades - ${err.message}`);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let data = gradesData;
    let params = req.body;
    const gradeId = parseInt(req.params.id, 10);

    let gradeIndex = data.grades.findIndex(grade => grade.id === gradeId);

    data.grades[gradeIndex].student = params.student;
    data.grades[gradeIndex].subject = params.subject;
    data.grades[gradeIndex].type = params.type;
    data.grades[gradeIndex].value = params.value;

    await fs.writeFile(global.fileName, JSON.stringify(data));
    res.send('grade updated');
    } catch {
      res.status(400).send({ error: err.message});
      console.error(`PUT /grades/:id - ${err.message}`);
    };
});

router.delete('/:id', async (req, res) => {
  try {
    let data = gradesData;
    const gradeId = parseInt(req.params.id, 10);

    let grades = data.grades.filter(grade => grade.id !== gradeId);
    data.grades = grades;

    await fs.writeFile(global.fileName, JSON.stringify(data));
    res.send('Grade deleted');
  } catch {
      res.status(400).send({ error: err.message});
      console.error(`DELETE /grades/:id - ${err.message}`);
    };
});

module.exports = router;
