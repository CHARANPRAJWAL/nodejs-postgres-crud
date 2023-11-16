const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Connect to your PostgreSQL database
const pool = new Pool({
    user: 'postgres',
    host: 'http://postgres-db.caprover.blr0.geekydev.com',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});



// CRUD operations

// Create
app.post('/items', async (req, res) => {
    const { name, description } = req.body;
    const result = await pool.query('INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
    res.json(result.rows[0]);
});

// Read
app.get('/items', async (req, res) => {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
});

// Update
app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await pool.query('UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
    res.json(result.rows[0]);
});

// Delete
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

