const express = require('express');
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: "Viraj", branch: "CE" },
  { id: 2, name: "Ravi", branch: "CE" }
];

app.get('/students', (req, res) => res.json(students));

app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  res.json(student);
});

app.post('/students', (req, res) => {
  const newStudent = { id: students.length + 1, name: req.body.name, branch: req.body.branch };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (student) {
    student.name = req.body.name;
    student.branch = req.body.branch;
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ message: "Student deleted" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000")); 
