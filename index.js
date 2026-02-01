const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// Connect to SQLite database
const db = new sqlite3.Database("employees.db");

// Create table and insert sample data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      email TEXT
    )
  `);

  db.run(`DELETE FROM employees`);

  db.run(`
    INSERT INTO employees (name, department, email) VALUES
    ('Rahul', 'IT', 'rahul@company.com'),
    ('Anita', 'HR', 'anita@company.com'),
    ('Vikram', 'Finance', 'vikram@company.com')
  `);
});

// Get all employees
app.get("/employees", (req, res) => {
  db.all("SELECT * FROM employees", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get employee by ID
app.get("/employees/:id", (req, res) => {
  db.get(
    "SELECT * FROM employees WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ message: "Employee not found" });
      res.json(row);
    }
  );
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Employee microservice running on port ${PORT}`);
});
