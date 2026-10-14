const express = require("express");
const app = express();
const PORT = 3000;

const fs = require("fs");
app.use(express.json());
const students = JSON.parse(fs.readFileSync("details.json", "utf8"));

app.get("/",(req,res) =>
{
    res.send("Welcome to Student page");
});

app.get("/details",(req,res) =>
{
    res.json(students);
});

app.get("/details/:id",(req,res) =>
{
    const id = parseInt(req.params.id);
    if(id >= 0 && id < students.length)
    {
        res.json(students[id]);
    }
    else
    {
        res.status(404).send("Student not found");
    } 
});

//REGISTER
app.post("/register",(req,res) =>
{
     const { name, email, password } = req.body;

    // Check if email already exists
    const user = students.find(student => student.email === email);

    if (user) {
        return res.status(400).send("User already exists");
    }

    const newUser = {
        name,
        email,
        password,
        
    };

    students.push(newUser);

    fs.writeFileSync("details.json", JSON.stringify(students, null, 4));

    res.send("Registration Successful");
});

// LOGIN
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = students.find(student =>
        student.email === email &&
        student.password === password
    );

    if (user) {
        res.send("Login Successful");
    } else {
        res.status(401).send("Invalid Email or Password");
    }
});

// CREATE
app.post("/details", (req, res) => {
    students.push(req.body);

    fs.writeFileSync("details.json", JSON.stringify(students, null, 4));

    res.send("Student added successfully");
});

//  UPDATE 
app.put("/details/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (id >= 0 && id < students.length) {

        students[id] = req.body;

        fs.writeFileSync("details.json", JSON.stringify(students, null, 4));

        res.send("Student updated successfully");

    } else {
        res.status(404).send("Student not found");
    }
});

//  DELETE

app.delete("/details/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (id >= 0 && id < students.length) {

        students.splice(id, 1);

        fs.writeFileSync("details.json", JSON.stringify(students, null, 4));

        res.send("Student deleted successfully");

    } else {
        res.status(404).send("Student not found");
    }
});

app.listen(PORT,() =>
{
    console.log("Server is running at http://localhost:3000");
});