import express from 'express';
import mysqlConnection from './database.js';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get('/api/companies', (req, res) => {
	mysqlConnection.query('SELECT * FROM api_company', (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});

app.get('/api/companies/:id', (req, res) => {
	mysqlConnection.query(
		'SELECT * FROM api_company WHERE id = ?',
		[req.params.id],
		(err, rows, fields) => {
			if (!err) {
				res.json(rows);
			} else {
				console.log(err);
			}
		}
	);
});

app.post('/api/companies', (req, res) => {
	const { name, city, country } = req.body;

	mysqlConnection.query(
		'INSERT INTO api_company (name, city, country) VALUES (?, ?, ?)',
		[name, city, country],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'Company saved successfully' });
			} else {
				console.log(err);
			}
		}
	);
});

app.put('/api/companies/:id', (req, res) => {
	const { name, city, country } = req.body;

	mysqlConnection.query(
		'UPDATE api_company SET name = ?, city = ?, country = ? WHERE id = ?',
		[name, city, country, req.params.id],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'Company updated successfully' });
			} else {
				console.log(err);
			}
		}
	);
});

// Server
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
