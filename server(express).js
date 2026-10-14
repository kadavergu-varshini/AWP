const http = require('http');
const fs = require('fs');
const url = require('url');

const FILE_NAME = "Student.json";

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    // Home Route
    if (pathname === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write("<h1>Welcome to my page!</h1>");
        return res.end();
    }

    // GET /students
    if (pathname === "/students" && req.method === "GET") {
        // Read file directly inside GET
        const fileData = fs.readFileSync(FILE_NAME, 'utf8');
        const students = JSON.parse(fileData);

        res.writeHead(200);
        res.write(JSON.stringify(students));
        return res.end();
    }

    // POST /students
    else if (pathname === "/students" && req.method === "POST") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // Read current file content
            const fileData = fs.readFileSync(FILE_NAME, 'utf8');
            let students = JSON.parse(fileData);

            let newStudent = JSON.parse(body);

            // Assign new ID
            const maxId = students.reduce((max, s) => (s.id > max ? s.id : max), 0);
            newStudent.id = maxId > 0 ? maxId + 1 : 1;

            students.push(newStudent);

            // Write back directly inside POST
            fs.writeFileSync(FILE_NAME, JSON.stringify(students, null, 4));

            res.writeHead(201);
            res.write(JSON.stringify(newStudent));
            return res.end();
        });
    }

    // PUT /students
    else if (pathname === "/students" && req.method === "PUT") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // Read current file content
            const fileData = fs.readFileSync(FILE_NAME, 'utf8');
            let students = JSON.parse(fileData);

            let updatedData = JSON.parse(body);
            let student = students.find(s => s.id === updatedData.id);

            if (student) {
                student.name = updatedData.name || student.name;
                student.grade = updatedData.grade || student.grade;

                // Write back directly inside PUT
                fs.writeFileSync(FILE_NAME, JSON.stringify(students, null, 4));

                res.writeHead(200);
                res.write(JSON.stringify(student));
            } else {
                res.writeHead(404);
                res.write(JSON.stringify({ message: "Student not found" }));
            }
            return res.end();
        });
    }

    // DELETE /students?id=6659
    else if (pathname === "/students" && req.method === "DELETE") {
        let idToDelete = parseInt(parsedUrl.query.id);

        // Read current file content
        const fileData = fs.readFileSync(FILE_NAME, 'utf8');
        let students = JSON.parse(fileData);

        let initialLength = students.length;
        students = students.filter(s => s.id !== idToDelete);

        if (students.length < initialLength) {
            // Write back directly inside DELETE
            fs.writeFileSync(FILE_NAME, JSON.stringify(students, null, 4));

            res.writeHead(200);
            res.write(JSON.stringify({ message: "Student deleted successfully" }));
        } else {
            res.writeHead(404);
            res.write(JSON.stringify({ message: "Student not found" }));
        }
        return res.end();
    }

    // 404 Route
    else {
        res.writeHead(404);
        res.write(JSON.stringify({ message: "Route not found" }));
        return res.end();
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});