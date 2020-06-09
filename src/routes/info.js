var express = require('express');
var fs = require('fs').promises;

var router = express.Router();

router.get('/studentTotalScore', (req, res) => {
  let data = gradesData;
  let student = req.body.student;
  let subject = req.body.subject;
  
  try {
    const studentGrade = data.grades.filter(grades => grades.student === student && grades.subject === subject);

    let finalGrade = studentGrade.reduce((total, current) => {
      return total + current.value;
    }, 0);

    res.send({"Total score": finalGrade});
  } catch (err) {
    res.sendStatus(400).send({ error: err.message});
      console.error(`GET /info/studentTotalScore - ${err.message}`);
  }
});

router.get('/gradeAverage', (req, res) => {
  let data = gradesData;
  let subject = req.body.subject;
  let type = req.body.type;

  try {
    const grades = data.grades.filter(grades => grades.subject === subject && grades.type === type);

    let totalGrades = grades.reduce((total, current) => {
      return total + current.value;
    }, 0);

    let averageGrades = totalGrades/grades.length;
    
    res.send({"Average ": averageGrades});
  } catch (err) {
    res.sendStatus(400).send({ error: err.message});
      console.error(`GET /info/gradeAverage - ${err.message}`);
  }
});

router.get('/bestGrades', (req, res) => {
  let data = gradesData;
  let subject = req.body.subject;
  let type = req.body.type;

  try {
    const grades = data.grades.filter(grades => grades.subject === subject && grades.type === type);

    let gradesSorted = grades.sort((a, b) => {
      return b.value - a.value;
    });
    
    res.send({"Best Grades ": gradesSorted.slice(0, 3)});
  } catch (err) {
    res.sendStatus(400).send({ error: err.message});
      console.error(`GET /info/studentTotalScore - ${err.message}`);
  }
});


module.exports = router;
